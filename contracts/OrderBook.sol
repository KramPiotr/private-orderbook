// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IOrderBook} from "./interfaces/IOrderBook.sol";

import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";
import {ebool, inEuint32, euint32, inEuint256, euint256, FHE} from "@fhenixprotocol/contracts/FHE.sol";
import {IFHERC20} from "./IFHERC20.sol";

contract OrderBook is IOrderBook, ReentrancyGuard {

    IFHERC20 public tradeToken;
    IFHERC20 public baseToken;

    Order[] buyBook;
    Order[] sellBook;

    euint256 internal CONST_0_ENCRYPTED;

    uint8 nOrders;

    /**
     * @notice Constructor
     */
    constructor(address _tradeToken, address _baseToken, uint8 nOrders) public {
        tradeToken = IFHERC20(_tradeToken);
        baseToken = IFHERC20(_baseToken);
        CONST_0_ENCRYPTED = FHE.asEuint256(0);
        nOrders = nOrders;
        _initOrderBook(buyBook);
        _initOrderBook(sellBook);
    }

    function _initOrderBook(Order[] storage orderBook) private {
        orderBook = new Order[](nOrders);
        for (uint8 priceDepthIdx = 0; priceDepthIdx < nOrders; priceDepthIdx++) {
            orderBook[priceDepthIdx] = Order(CONST_0_ENCRYPTED + CONST_0_ENCRYPTED, CONST_0_ENCRYPTED + CONST_0_ENCRYPTED, CONST_0_ENCRYPTED + CONST_0_ENCRYPTED);
        }
    }

    /**
     * @notice Place buy order.
     */
    function placeBuyOrder(
        inEuint256 calldata orderId,
        inEuint256 calldata price,
        inEuint256 calldata qty
    ) external override nonReentrant { //TODO: we need to make sure that there is a function to check whether your order is still in the order book
        // baseToken.transferFromEncrypted(
        //     msg.sender,
        //     address(this),
        //     qty
        // ); //Order: price, qty, 
        euint256 qtyLeft = FHE.asEuint256(qty);
        for (uint16 orderIdx = 0; orderIdx < nOrders; orderIdx++) {
            ebool isCrossing = price.gte(sellBook[orderIdx].price);
            euint256 potentialQtyFilled = FHE.min(qtyLeft, sellBook[orderIdx].qty);
            euint256 qtyFilled = FHE.select(isCrossing, potentialQtyFilled, CONST_0_ENCRYPTED);
            qtyLeft = qtyLeft - qtyFilled;

            results[sellBook[orderIdx].id] = qtyFilled; //TODO: instead of doing this you could just transfer the funds
        }

        ebool shift = FHE.asEbool(false);
        euint256 idCarriedOn = orderId;
        euint256 priceCarriedOn = price;
        euint256 qtyCarriedOn = qtyLeft;
        ebool doInsert = qtyLeft.gt(CONST_0_ENCRYPTED);
        euint256 prevPrice = CONST_0_ENCRYPTED;
        for (uint16 orderIdx = 0; orderIdx < nOrders; orderIdx++) {

            ebool isCorrectPosition = FHE.and(FHE.eq(prevPrice, price), buyBook[orderIdx].price.gt(price));
            shift = FHE.or(shift, FHE.and(doInsert, isCorrectPosition));
            prevPrice = buyBook[orderIdx].price;

            euint256 nextIdCarriedOn = FHE.select(shift, buyBook[orderIdx].id, idCarriedOn);
            euint256 nextPriceCarriedOn = FHE.select(shift, buyBook[orderIdx].price, priceCarriedOn);
            euint256 nextQtyCarriedOn = FHE.select(shift, buyBook[orderIdx].qty, qtyCarriedOn);

            buyBook[orderIdx].id = FHE.select(shift, idCarriedOn, buyBook[orderIdx].id);
            buyBook[orderIdx].price = FHE.select(shift, priceCarriedOn, buyBook[orderIdx].price);
            buyBook[orderIdx].qty = FHE.select(shift, qtyCarriedOn, buyBook[orderIdx].qty);

            idCarriedOn = nextIdCarriedOn;
            priceCarriedOn = nextPriceCarriedOn;
            qtyCarriedOn = nextQtyCarriedOn;
        }
        return results;
    }
};
