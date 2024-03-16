// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.24;

import {inEuint8, euint8} from "@fhenixprotocol/contracts/FHE.sol";
/**
 * @title Interface for OrderBook
 */
interface IOrderBook {
    struct Order {
        euint8 qty;
        euint8 price;
    }

    function placeBuyOrder(
        inEuint8 calldata price,
        inEuint8 calldata qty
    ) external;
}