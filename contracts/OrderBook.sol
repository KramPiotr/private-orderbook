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

    ExecutionResult[N_ORDERS] public lastFills;//hack to prove that it's working, will be changed later
    euint8 public lastShiftBy;
    euint8 public qtyNotFilled;

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

    constructor(address _tradeToken, address _baseToken) {
        tradeToken = IFHERC20(_tradeToken);
        baseToken = IFHERC20(_baseToken);
        CONST_0_ENCRYPTED = FHE.asEuint8(0);
        CONST_1_ENCRYPTED = FHE.asEuint8(1);
    }

    // function getLastFills(Permission calldata permission) public view virtual returns (bytes memory) {
    //     return FHE.sealoutput(lastFills, permission.publicKey);
    // }


    function getMostCompetitiveFillQty(Permission calldata permission) public view virtual returns (bytes memory) {
        return FHE.sealoutput(lastFills[0].quantity, permission.publicKey);
    }

    function getMostCompetitiveBuyQty(Permission calldata permission) public view virtual returns (bytes memory) {
        return FHE.sealoutput(buyBook[0].qty, permission.publicKey);
    }

    function getQtyNotFilled(Permission calldata permission) public view virtual returns (bytes memory) {
        return FHE.sealoutput(qtyNotFilled, permission.publicKey);
    }

    function placeBuyOrder(
        // inEuint8 calldata orderIdBytes,
        inEuint8 calldata priceBytes,
        inEuint8 calldata qtyBytes
    ) external nonReentrant {
        
        // euint8 orderId = FHE.asEuint8(orderIdBytes);
        euint8 qtyLeft = FHE.asEuint8(qtyBytes);
        euint8 price = FHE.asEuint8(priceBytes);

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

            // tradeToken.transferFromEncrypted( //this causes header timeout issue :(
            //     address(this),
            //     msg.sender,
            //     qtyFilled.toU32()
            // );

            lastFills[orderIdx] = ExecutionResult(sellBook[orderIdx].id, qtyFilled); //doing this hack as transferrring caused issues
        }

        lastShiftBy = shiftBy;

        qtyNotFilled = qtyLeft;
    }

    function shiftSellBook() external {
        euint8 shiftBy = lastShiftBy;
        for (uint8 shiftIdx = 0; shiftIdx < N_ORDERS - 1; shiftIdx++) {
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


    function insertBuyOrder(
        inEuint8 calldata orderIdBytes,
        inEuint8 calldata priceBytes
    ) external nonReentrant {

        euint8 orderId = FHE.asEuint8(orderIdBytes);
        euint8 price = FHE.asEuint8(priceBytes);

        ebool shift = FHE.asEbool(false);
        euint8 idCarriedOn = orderId;
        euint8 priceCarriedOn = price;
        euint8 qtyCarriedOn = qtyNotFilled;
        ebool doInsert = qtyNotFilled.gt(CONST_0_ENCRYPTED);
        euint8 prevPrice = CONST_0_ENCRYPTED;
        for (uint8 orderIdx = 0; orderIdx < N_ORDERS; orderIdx++) {

            ebool isCorrectPosition = FHE.or(buyBook[orderIdx].price.eq(CONST_0_ENCRYPTED), FHE.and(price.gte(prevPrice), buyBook[orderIdx].price.gt(price)));
            shift = FHE.or(shift, FHE.and(doInsert, isCorrectPosition));
            prevPrice = buyBook[orderIdx].price;

            euint8 nextIdCarriedOn = FHE.select(shift, buyBook[orderIdx].id, idCarriedOn);
            euint8 nextPriceCarriedOn = FHE.select(shift, buyBook[orderIdx].price, priceCarriedOn);
            euint8 nextQtyCarriedOn = FHE.select(shift, buyBook[orderIdx].qty, qtyCarriedOn);

            buyBook[orderIdx].id = FHE.select(shift, idCarriedOn, buyBook[orderIdx].id);
            buyBook[orderIdx].price = FHE.select(shift, priceCarriedOn, buyBook[orderIdx].price);
            buyBook[orderIdx].qty = FHE.select(shift, qtyCarriedOn, buyBook[orderIdx].qty);

            idCarriedOn = nextIdCarriedOn;
            priceCarriedOn = nextPriceCarriedOn;
            qtyCarriedOn = nextQtyCarriedOn;
        }
    }

    function placeSellOrder(
        // inEuint8 calldata orderIdBytes,
        inEuint8 calldata priceBytes,
        inEuint8 calldata qtyBytes
    ) external nonReentrant {
        
        // euint8 orderId = FHE.asEuint8(orderIdBytes);
        euint8 qtyLeft = FHE.asEuint8(qtyBytes);
        euint8 price = FHE.asEuint8(priceBytes);

        // baseToken.transferFromEncrypted(
        //     msg.sender,
        //     address(this),
        //     qtyLeft.toU32()
        // ); //Order: price, qty, 
        euint8 shiftBy = CONST_0_ENCRYPTED;
        for (uint8 orderIdx = 0; orderIdx < N_ORDERS; orderIdx++) {
            ebool isCrossing = price.lte(buyBook[orderIdx].price);
            euint8 potentialQtyFilled = FHE.min(qtyLeft, buyBook[orderIdx].qty);
            euint8 qtyFilled = FHE.select(isCrossing, potentialQtyFilled, CONST_0_ENCRYPTED);
            qtyLeft = qtyLeft - qtyFilled;
            buyBook[orderIdx].qty = buyBook[orderIdx].qty - qtyFilled;
            euint8 incrementedShiftBy = shiftBy + CONST_1_ENCRYPTED;
            shiftBy = FHE.select(buyBook[orderIdx].qty.eq(CONST_0_ENCRYPTED), incrementedShiftBy, shiftBy);

            // tradeToken.transferFromEncrypted( //this causes header timeout issue :(
            //     address(this),
            //     msg.sender,
            //     qtyFilled.toU32()
            // );

            lastFills[orderIdx] = ExecutionResult(sellBook[orderIdx].id, qtyFilled); //doing this hack as transferrring caused issues
        }

        lastShiftBy = shiftBy;

        qtyNotFilled = qtyLeft;
    }

    function shiftBuyBook() external {
        euint8 shiftBy = lastShiftBy;
        for (uint8 shiftIdx = 0; shiftIdx < N_ORDERS - 1; shiftIdx++) {
            ebool doShift = shiftBy.gt(CONST_0_ENCRYPTED);
            shiftBy = FHE.select(doShift, shiftBy - CONST_1_ENCRYPTED, shiftBy);
            euint8 lastPrice = CONST_0_ENCRYPTED;
            euint8 lastQty = CONST_0_ENCRYPTED;
            for (uint8 orderIdx = N_ORDERS - 1; orderIdx >= 0; orderIdx--) {
                euint8 nextLastPrice = buyBook[orderIdx].price;
                euint8 nextLastQty = buyBook[orderIdx].qty;

                buyBook[orderIdx].price = FHE.select(doShift, lastPrice, nextLastPrice);
                buyBook[orderIdx].qty = FHE.select(doShift, lastQty, nextLastQty);

                lastPrice = nextLastPrice;
                lastQty = nextLastQty;
            }
        }
    }


    function insertSellOrder(
        inEuint8 calldata orderIdBytes,
        inEuint8 calldata priceBytes
    ) external nonReentrant {

        euint8 orderId = FHE.asEuint8(orderIdBytes);
        euint8 price = FHE.asEuint8(priceBytes);

        ebool shift = FHE.asEbool(false);
        euint8 idCarriedOn = orderId;
        euint8 priceCarriedOn = price;
        euint8 qtyCarriedOn = qtyNotFilled;
        ebool doInsert = qtyNotFilled.gt(CONST_0_ENCRYPTED);
        euint8 prevPrice = CONST_0_ENCRYPTED;
        for (uint8 orderIdx = 0; orderIdx < N_ORDERS; orderIdx++) {

            ebool isCorrectPosition = FHE.or(sellBook[orderIdx].price.eq(CONST_0_ENCRYPTED), FHE.and(price.lte(prevPrice), sellBook[orderIdx].price.lt(price)));
            shift = FHE.or(shift, FHE.and(doInsert, isCorrectPosition));
            prevPrice = sellBook[orderIdx].price;

            euint8 nextIdCarriedOn = FHE.select(shift, sellBook[orderIdx].id, idCarriedOn);
            euint8 nextPriceCarriedOn = FHE.select(shift, sellBook[orderIdx].price, priceCarriedOn);
            euint8 nextQtyCarriedOn = FHE.select(shift, sellBook[orderIdx].qty, qtyCarriedOn);

            sellBook[orderIdx].id = FHE.select(shift, idCarriedOn, sellBook[orderIdx].id);
            sellBook[orderIdx].price = FHE.select(shift, priceCarriedOn, sellBook[orderIdx].price);
            sellBook[orderIdx].qty = FHE.select(shift, qtyCarriedOn, sellBook[orderIdx].qty);

            idCarriedOn = nextIdCarriedOn;
            priceCarriedOn = nextPriceCarriedOn;
            qtyCarriedOn = nextQtyCarriedOn;
        }
    }
}
