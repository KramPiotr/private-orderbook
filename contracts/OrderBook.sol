// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8;

import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";
import {Math} from "@openzeppelin/contracts/math/Math.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IOrderBook} from "./interfaces/IOrderBook.sol";

import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";
import {ebool, inEuint32, euint32, inEuint256, euint256, FHE} from "@fhenixprotocol/contracts/FHE.sol";
import {IFHERC20} from "./IFHERC20.sol";
import "./ConfAddress.sol";

contract OrderBook is IOrderBook, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeMath for uint8;
    using Math for uint256;

    IFHERC20 public tradeToken;
    IFHERC20 public baseToken;

    Order[][] buyBook;
    Order[][] sellBook;

    euint256 sellPriceFromLevel[];
    euint256 buyPriceFromLevel[];

    euint256 internal CONST_0_ENCRYPTED;

    uint8 nPriceLevels;

    /**
     * @notice Constructor
     */
    constructor(address _tradeToken, address _baseToken, uint8 nPriceLevels, uint8 priceLevelDepth) public {
        tradeToken = IFHERC20(_tradeToken);
        baseToken = IFHERC20(_baseToken);
        CONST_0_ENCRYPTED = FHE.asEuint256(0);
        nPriceLevels = nPriceLevels;
        priceLevelDepth = priceLevelDepth;
        _initOrderBook(buyBook, nPriceLevels, priceLevelDepth);
        _initOrderBook(sellBook, nPriceLevels, priceLevelDepth);
        _initPriceFromLevel(buyPriceFromLevel, nPriceLevels);
        _initPriceFromLevel(sellPriceFromLevel, nPriceLevels);
    }

    function _initOrderBook(Order[][] orderBook, uint8 nPriceLevels, uint8 priceLevelDepth) private {
        orderBook = new Order[](nPriceLevels);
        for (uint8 priceDepthIdx = 0; priceDepthIdx < priceLevelDepth; priceDepthIdx++) {
            orderBook[priceDepthIdx] = Order(CONST_0_ENCRYPTED + CONST_0_ENCRYPTED, CONST_0_ENCRYPTED + CONST_0_ENCRYPTED);
        }
    }

    function _initPriceFromLevel(euint256 priceFromLevel[], uint8 nPriceLevels) {
        priceFromLevel = new euint256[](nPriceLevels);
        for(uint8 i = 0; i < nPriceLevels; i++) {
            priceFromLevel[i] = CONST_0_ENCRYPTED + CONST_0_ENCRYPTED;
        }
    }

    /**
     * @notice Place buy order.
     */
    function placeBuyOrder(
        inEuint256 calldata price,
        inEuint256 calldata amountOfBaseToken
    ) external override nonReentrant { //TODO: we need to make sure that there is a function to check whether your order is still in the order book
        baseToken.transferFromEncrypted(
            msg.sender,
            address(this),
            amountOfBaseToken
        );
        euint256 qtyLeft = FHE.asEuint256(amountOfBaseToken);
        mapping(euint256 => euint256) results;
        for (uint8 priceLevelIdx = 0; priceLevelIdx < nPriceLevels; priceLevelIdx++) {
            for (uint8 depthIdx = 0; depthIdx < priceLevelDepth; depthIdx++) {

                ebool isCrossing = price.gte(sellPriceFromLevel[priceLevelIdx]);
                euint256 potentialQtyFilled = FHE.min(qtyLeft, sellBook[priceLevelIdx][depthIdx].qty);
                euint256 qtyFilled = FHE.select(isCrossing, potentialQtyFilled, CONST_0_ENCRYPTED);
                qtyLeft = qtyLeft - qtyFilled;

                results[sellBook[priceLevelIdx][depthIdx].orderId] = qtyFilled;
            }
        }

        ebool priceNotInBook = FHE.ne(buyPriceFromLevel[0], price);
        for (uint8 priceLevelIdx = 1; priceLevelIdx < nPriceLevels; priceLevelIdx++) {
            priceNotInBook = FHE.and(priceNotInBook, FHE.ne(buyPriceFromLevel[priceLevelIdx], price));
        }

        ebool doReplaceMin = FHE.and(qtyLeft.gt(0), priceNotInBook);
        euint256 minPrice = _getMin(buyPriceFromLevel);

        for (uint8 idx = 0; idx < prices.length; idx++) {
            ebool isReplaced = FHE.and(doReplaceMin, FHE.eq(minPrice, buyPriceFromLevel[idx]));
            buyPriceFromLevel[idx].price = FHE.select(isReplaced, price, buyPriceFromLevel[idx].price);
            buyBook[idx][0].orderId = FHE.select(isReplaced, orderId, buyBook[idx][0].orderId);
            buyBook[idx][0].price = FHE.select(isReplaced, price, buyBook[idx][0].price);
            for (uint depthIdx = 1; depthIdx < priceLevelDepth; depthIdx++) {
                buyBook[idx][depthIdx].orderId = FHE.select(isReplaced, CONST_0_ENCRYPTED, buyBook[idx][depthIdx].orderId);
                buyBook[idx][depthIdx].price = FHE.select(isReplaced, CONST_0_ENCRYPTED, buyBook[idx][depthIdx].price);
            }
        }

        return results;
    }

    function _getMin(euint256[] prices) private returns (euint256) {
        euint256 minPrice = prices[0];
        for (uint8 idx = 1; idx < prices.length; idx++) {
            minPrice = FHE.min(minPrice, prices[idx]);
        }
        return minPrice;
    }
}
