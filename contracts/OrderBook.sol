// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {Permissioned, Permission} from "@fhenixprotocol/contracts/access/Permissioned.sol";
import {ebool, inEuint8, euint8, inEuint32, euint32, FHE} from "@fhenixprotocol/contracts/FHE.sol";
import {IFHERC20} from "./IFHERC20.sol";

contract OrderBook is ReentrancyGuard {

    IFHERC20 public tradeToken;
    IFHERC20 public baseToken;

    uint8 constant N_ORDERS = 2;

    Order[N_ORDERS] buyBook;
    Order[N_ORDERS] sellBook;

    euint8 internal CONST_0_ENCRYPTED;
    euint8 internal CONST_1_ENCRYPTED;

    struct Order {
        euint8 id;
        euint8 qty;
        euint8 price;
    }
    struct ExecutionResult {
        euint8 orderId;
        euint8 quantity;
    }

    struct PlaceOrderResult {
        ExecutionResult[N_ORDERS] fills;
        euint8 shiftBy;
    }

    /**
     * @notice Constructor
     */
    constructor(address _tradeToken, address _baseToken) {
        tradeToken = IFHERC20(_tradeToken);
        baseToken = IFHERC20(_baseToken);
        CONST_0_ENCRYPTED = FHE.asEuint8(0);
        CONST_1_ENCRYPTED = FHE.asEuint8(1);
        // buyBook = new Order[](N_ORDERS);
        // sellBook = new Order[](N_ORDERS);
    }

    /**
     * @notice Place buy order.
     */
    function placeBuyOrder(
        inEuint8 calldata orderIdBytes,
        inEuint8 calldata priceBytes,
        inEuint8 calldata qtyBytes
    ) external nonReentrant returns (PlaceOrderResult memory){ //TODO: we need to make sure that there is a function to check whether your order is still in the order book
        
        euint8 orderId = FHE.asEuint8(orderIdBytes);
        euint8 qtyLeft = FHE.asEuint8(qtyBytes);
        euint8 price = FHE.asEuint8(priceBytes);

        ExecutionResult[N_ORDERS] memory results;
        // baseToken.transferFromEncrypted(
        //     msg.sender,
        //     address(this),
        //     qtyLeft.toU32()
        // ); //Order: price, qty, 
        euint8 shiftBy = CONST_0_ENCRYPTED;
        for (uint8 orderIdx = 0; orderIdx < N_ORDERS; orderIdx++) {
            ebool isCrossing = price.gte(sellBook[orderIdx].price);
            euint8 potentialQtyFilled = FHE.min(qtyLeft, sellBook[orderIdx].qty);
            euint8 qtyFilled = FHE.select(isCrossing, potentialQtyFilled, CONST_0_ENCRYPTED);
            qtyLeft = qtyLeft - qtyFilled;
            sellBook[orderIdx].qty = sellBook[orderIdx].qty - qtyFilled;
            euint8 incrementedShiftBy = shiftBy + CONST_1_ENCRYPTED;
            shiftBy = FHE.select(sellBook[orderIdx].qty.eq(CONST_0_ENCRYPTED), incrementedShiftBy, shiftBy);

            // tradeToken.transferFromEncrypted( //TODO: this causes header timeout issue :(
            //     address(this),
            //     msg.sender,
            //     qtyFilled.toU32()
            // );

            results[orderIdx] = ExecutionResult(sellBook[orderIdx].id, qtyFilled); //TODO: instead of doing this you could just transfer the funds
        }

        return PlaceOrderResult(results, shiftBy);

        // for (uint8 shiftIdx = 0; shiftIdx < N_ORDERS; shiftIdx++) {
        //     ebool doShift = shiftBy.gt(CONST_0_ENCRYPTED);
        //     shiftBy = FHE.select(doShift, shiftBy - CONST_1_ENCRYPTED, shiftBy);
        //     euint8 lastPrice = CONST_0_ENCRYPTED;
        //     euint8 lastQty = CONST_0_ENCRYPTED;
        //     for (uint8 orderIdx = N_ORDERS - 1; orderIdx >= 0; orderIdx--) {
        //         euint8 nextLastPrice = sellBook[orderIdx].price;
        //         euint8 nextLastQty = sellBook[orderIdx].qty;

        //         sellBook[orderIdx].price = FHE.select(doShift, lastPrice, nextLastPrice);
        //         sellBook[orderIdx].qty = FHE.select(doShift, lastQty, nextLastQty);

        //         lastPrice = nextLastPrice;
        //         lastQty = nextLastQty;
        //     }
        // }

        // ebool shift = FHE.asEbool(false);
        // euint8 idCarriedOn = orderId;
        // euint8 priceCarriedOn = price;
        // euint8 qtyCarriedOn = qtyLeft;
        // ebool doInsert = qtyLeft.gt(CONST_0_ENCRYPTED);
        // euint8 prevPrice = CONST_0_ENCRYPTED;
        // for (uint8 orderIdx = 0; orderIdx < N_ORDERS; orderIdx++) {

        //     ebool isCorrectPosition = FHE.and(FHE.eq(prevPrice, price), buyBook[orderIdx].price.gt(price));
        //     shift = FHE.or(shift, FHE.and(doInsert, isCorrectPosition));
        //     prevPrice = buyBook[orderIdx].price;

        //     euint8 nextIdCarriedOn = FHE.select(shift, buyBook[orderIdx].id, idCarriedOn);
        //     euint8 nextPriceCarriedOn = FHE.select(shift, buyBook[orderIdx].price, priceCarriedOn);
        //     euint8 nextQtyCarriedOn = FHE.select(shift, buyBook[orderIdx].qty, qtyCarriedOn);

        //     buyBook[orderIdx].id = FHE.select(shift, idCarriedOn, buyBook[orderIdx].id);
        //     buyBook[orderIdx].price = FHE.select(shift, priceCarriedOn, buyBook[orderIdx].price);
        //     buyBook[orderIdx].qty = FHE.select(shift, qtyCarriedOn, buyBook[orderIdx].qty);

        //     idCarriedOn = nextIdCarriedOn;
        //     priceCarriedOn = nextPriceCarriedOn;
        //     qtyCarriedOn = nextQtyCarriedOn;
        // }
    }

    function shiftSellBook(
        inEuint8 calldata shiftByBytes
    ) external { //TODO: we need to make sure that there is a function to check whether your order is still in the order book

        euint8 shiftBy = FHE.asEuint8(shiftByBytes);
        for (uint8 shiftIdx = 0; shiftIdx < N_ORDERS; shiftIdx++) {
            ebool doShift = shiftBy.gt(CONST_0_ENCRYPTED);
            shiftBy = FHE.select(doShift, shiftBy - CONST_1_ENCRYPTED, shiftBy);
            euint8 lastPrice = CONST_0_ENCRYPTED;
            euint8 lastQty = CONST_0_ENCRYPTED;
            for (uint8 orderIdx = N_ORDERS - 1; orderIdx >= 0; orderIdx--) {
                euint8 nextLastPrice = sellBook[orderIdx].price;
                euint8 nextLastQty = sellBook[orderIdx].qty;

                sellBook[orderIdx].price = FHE.select(doShift, lastPrice, nextLastPrice);
                sellBook[orderIdx].qty = FHE.select(doShift, lastQty, nextLastQty);

                lastPrice = nextLastPrice;
                lastQty = nextLastQty;
            }
        }
    }

}
