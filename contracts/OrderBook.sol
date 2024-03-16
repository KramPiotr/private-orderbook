// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.8;

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

    euint256 internal CONST_0_ENCRYPTED;

    mapping(uint256 => mapping(uint8 => Order)) public buyOrdersInStep;
    mapping(uint256 => Step) public buySteps;
    mapping(uint256 => uint8) public buyOrdersInStepCounter;
    uint256 public maxBuyPrice;

    mapping(uint256 => mapping(uint8 => Order)) public sellOrdersInStep;
    mapping(uint256 => Step) public sellSteps;
    mapping(uint256 => uint8) public sellOrdersInStepCounter;
    uint256 public minSellPrice;

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
        emit PlaceBuyOrder(msg.sender, price, amountOfBaseToken);

        euint256 qtyLeft = FHE.asEuint256(amountOfBaseToken);
        mapping(euint256 => euint256) results;
        for (int priceLevelIdx = 0; priceLevelIdx < nPriceLevels; priceLevelIdx++) {
            for (int depthIdx = 0; depthIdx < priceLevelDepth; depthIdx++) {

                ebool isCrossing = price.gte(sellBook[priceLevelIdx][depthIdx].price);
                euint256 potentialQtyFilled = FHE.min(qtyLeft, sellBook[priceLevelIdx][depthIdx].qty);
                euint256 qtyFilled = FHE.select(isCrossing, potentialQtyFilled, CONST_0_ENCRYPTED);
                qtyLeft = qtyLeft - qtyFilled;

                results[sellBook[priceLevelIdx][depthIdx].orderId] = qtyFilled;
            }
        }

        /**
         * @notice if has order in sell book, and price >= min sell price
         */
        uint256 sellPricePointer = minSellPrice;
        euint256 amountReflect = FHE.asEuint256(amountOfBaseToken);
        if (minSellPrice > 0 && price >= minSellPrice) {
            while (
                amountReflect.gt(CONST_0_ENCRYPTED) &&
                sellPricePointer <= price &&
                sellPricePointer != 0
            ) {
                uint8 i = 1;
                uint256 higherPrice = sellSteps[sellPricePointer].higherPrice;
                while (
                    i <= sellOrdersInStepCounter[sellPricePointer] &&
                    amountReflect.gt(CONST_0_ENCRYPTED)
                ) {
                    //TODO: if prices are public, would it make a lot of sense to remove the encrypted checks from loops and if statements? If so, which ones are worth modifying?
                        uint256 orderAmount = sellOrdersInStep[
                            sellPricePointer
                        ][i].amount;
                        uint256 filledQuantity = FHE.min(
                            orderAmount,
                            amountReflect
                        );

                        amountReflect = amountReflect.sub(filledQuantity);

                        if (filledQuantity == orderAmount) {
                            // Order has been filled
                            if (
                                i == sellOrdersInStepCounter[sellPricePointer]
                            ) {
                                if (higherPrice > 0) {
                                    sellSteps[higherPrice].lowerPrice = 0;
                                }
                                delete sellSteps[sellPricePointer];
                                minSellPrice = higherPrice;
                            }
                        } else {
                            // Order has been partially filled
                            newSellOrdersInStep[newOrdersIndex] = orderAmount
                                .sub(filledQuantity);
                            newOrdersIndex++;
                        }

                        i += 1;

                    // sellPricePointer = higherPrice;
                    // sellOrdersInStepCounter[sellPricePointer] = newOrdersIndex;
                    // for (uint256 j = 0; j < newOrdersIndex; j++) {
                    //     sellOrdersInStep[sellPricePointer][j + 1]
                    //         .amount = newSellOrdersInStep[j];
                    // }

                    if (
                        amountReflect.gte(
                            sellOrdersInStep[sellPricePointer][i].amount
                        )
                    ) {
                        //if the last order has been matched, delete the step
                        if (i == sellOrdersInStepCounter[sellPricePointer]) {
                            if (higherPrice > 0) {
                                sellSteps[higherPrice].lowerPrice = 0;
                            }
                            delete sellSteps[sellPricePointer];
                            minSellPrice = higherPrice;
                        }

                        amountReflect = amountReflect.sub(
                            sellOrdersInStep[sellPricePointer][i].amount
                        );

                        // delete order from storage
                        delete sellOrdersInStep[sellPricePointer][i];
                        sellOrdersInStepCounter[sellPricePointer] -= 1;
                    } else {
                        sellSteps[sellPricePointer].amount = sellSteps[
                            sellPricePointer
                        ].amount.sub(amountReflect);
                        sellOrdersInStep[sellPricePointer][i]
                            .amount = sellOrdersInStep[sellPricePointer][i]
                            .amount
                            .sub(amountReflect);
                        amountReflect = CONST_0_ENCRYPTED + CONST_0_ENCRYPTED; //Done to obfuscate 0
                    }
                    i += 1;
                }
                sellPricePointer = higherPrice;
            }
        }
        /**
         * @notice draw to buy book the rest
         */
        if (amountReflect > 0) {
            _drawToBuyBook(price, amountReflect);
        }
    }

    /**
     * @notice Place buy order.
     */
    function placeSellOrder(
        uint256 price,
        uint256 amountOfTradeToken
    ) external override nonReentrant {
        tradeToken.safeTransferFrom(
            msg.sender,
            address(this),
            amountOfTradeToken
        );
        emit PlaceSellOrder(msg.sender, price, amountOfTradeToken);

        /**
         * @notice if has order in buy book, and price <= max buy price
         */
        uint256 buyPricePointer = maxBuyPrice;
        uint256 amountReflect = amountOfTradeToken;
        if (maxBuyPrice > 0 && price <= maxBuyPrice) {
            while (
                amountReflect > 0 &&
                buyPricePointer >= price &&
                buyPricePointer != 0
            ) {
                uint8 i = 1;
                uint256 lowerPrice = buySteps[buyPricePointer].lowerPrice;
                while (
                    i <= buyOrdersInStepCounter[buyPricePointer] &&
                    amountReflect > 0
                ) {
                    if (
                        amountReflect >=
                        buyOrdersInStep[buyPricePointer][i].amount
                    ) {
                        //if the last order has been matched, delete the step
                        if (i == buyOrdersInStepCounter[buyPricePointer]) {
                            if (lowerPrice > 0)
                                buySteps[lowerPrice].higherPrice = 0;
                            delete buySteps[buyPricePointer];
                            maxBuyPrice = lowerPrice;
                        }

                        amountReflect = amountReflect.sub(
                            buyOrdersInStep[buyPricePointer][i].amount
                        );

                        // delete order from storage
                        delete buyOrdersInStep[buyPricePointer][i];
                        buyOrdersInStepCounter[buyPricePointer] -= 1;
                    } else {
                        buySteps[buyPricePointer].amount = buySteps[
                            buyPricePointer
                        ].amount.sub(amountReflect);
                        buyOrdersInStep[buyPricePointer][i]
                            .amount = buyOrdersInStep[buyPricePointer][i]
                            .amount
                            .sub(amountReflect);
                        amountReflect = 0;
                    }
                    i += 1;
                }
                buyPricePointer = lowerPrice;
            }
        }
        /**
         * @notice draw to buy book the rest
         */
        if (amountReflect > 0) {
            _drawToSellBook(price, amountReflect);
        }
    }

    /**
     * @notice draw buy order.
     */
    function _drawToBuyBook(uint256 price, uint256 amount) internal {
        require(price > 0, "Can not place order with price equal 0");

        buyOrdersInStepCounter[price] += 1;
        buyOrdersInStep[price][buyOrdersInStepCounter[price]] = Order(
            msg.sender,
            amount
        );
        buySteps[price].amount = buySteps[price].amount.add(amount);
        emit DrawToBuyBook(msg.sender, price, amount);

        if (maxBuyPrice == 0) {
            maxBuyPrice = price;
            return;
        }

        if (price > maxBuyPrice) {
            buySteps[maxBuyPrice].higherPrice = price;
            buySteps[price].lowerPrice = maxBuyPrice;
            maxBuyPrice = price;
            return;
        }

        if (price == maxBuyPrice) {
            return;
        }

        uint256 buyPricePointer = maxBuyPrice;
        while (price <= buyPricePointer) {
            buyPricePointer = buySteps[buyPricePointer].lowerPrice;
        }

        if (price < buySteps[buyPricePointer].higherPrice) {
            buySteps[price].higherPrice = buySteps[buyPricePointer].higherPrice;
            buySteps[price].lowerPrice = buyPricePointer;

            buySteps[buySteps[buyPricePointer].higherPrice].lowerPrice = price;
            buySteps[buyPricePointer].higherPrice = price;
        }
    }

    /**
     * @notice draw sell order.
     */
    function _drawToSellBook(uint256 price, uint256 amount) internal {
        require(price > 0, "Can not place order with price equal 0");

        sellOrdersInStepCounter[price] += 1;
        sellOrdersInStep[price][sellOrdersInStepCounter[price]] = Order(
            msg.sender,
            amount
        );
        sellSteps[price].amount += amount;
        emit DrawToSellBook(msg.sender, price, amount);

        if (minSellPrice == 0) {
            minSellPrice = price;
            return;
        }

        if (price < minSellPrice) {
            sellSteps[minSellPrice].lowerPrice = price;
            sellSteps[price].higherPrice = minSellPrice;
            minSellPrice = price;
            return;
        }

        if (price == minSellPrice) {
            return;
        }

        uint256 sellPricePointer = minSellPrice;
        while (
            price >= sellPricePointer &&
            sellSteps[sellPricePointer].higherPrice != 0
        ) {
            sellPricePointer = sellSteps[sellPricePointer].higherPrice;
        }

        if (sellPricePointer < price) {
            sellSteps[price].lowerPrice = sellPricePointer;
            sellSteps[sellPricePointer].higherPrice = price;
        }

        if (
            sellPricePointer > price &&
            price > sellSteps[sellPricePointer].lowerPrice
        ) {
            sellSteps[price].lowerPrice = sellSteps[sellPricePointer]
                .lowerPrice;
            sellSteps[price].higherPrice = sellPricePointer;

            sellSteps[sellSteps[sellPricePointer].lowerPrice]
                .higherPrice = price;
            sellSteps[sellPricePointer].lowerPrice = price;
        }
    }
}
