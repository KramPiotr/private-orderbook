// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.24;

import {euint32} from "@fhenixprotocol/contracts/FHE.sol";
/**
 * @title Interface for OrderBook
 */
interface IOrderBook {
    struct Order {
        euint32 id,
        euint32 qty,
        euint32 price
    }
}