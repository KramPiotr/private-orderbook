// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8;

import {euint256} from "@fhenixprotocol/contracts/FHE.sol";
/**
 * @title Interface for OrderBook
 */
interface IOrderBook {
    struct Order {
        euint256 orderId,
        euint256 qty
    }
}