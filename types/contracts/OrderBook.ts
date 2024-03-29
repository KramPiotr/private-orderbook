/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export type PermissionStruct = { publicKey: BytesLike; signature: BytesLike };

export type PermissionStructOutput = [publicKey: string, signature: string] & {
  publicKey: string;
  signature: string;
};

export type InEuint8Struct = { data: BytesLike };

export type InEuint8StructOutput = [data: string] & { data: string };

export interface OrderBookInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "baseToken"
      | "getMostCompetitiveBuyQty"
      | "getMostCompetitiveFillOrderId"
      | "getMostCompetitiveFillQty"
      | "getQtyNotFilled"
      | "insertBuyOrder"
      | "insertSellOrder"
      | "lastFills"
      | "lastShiftBy"
      | "placeBuyOrder"
      | "placeSellOrder"
      | "qtyNotFilled"
      | "shiftBuyBook"
      | "shiftSellBook"
      | "tradeToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "baseToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getMostCompetitiveBuyQty",
    values: [PermissionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getMostCompetitiveFillOrderId",
    values: [PermissionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getMostCompetitiveFillQty",
    values: [PermissionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getQtyNotFilled",
    values: [PermissionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "insertBuyOrder",
    values: [InEuint8Struct, InEuint8Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "insertSellOrder",
    values: [InEuint8Struct, InEuint8Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "lastFills",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lastShiftBy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "placeBuyOrder",
    values: [InEuint8Struct, InEuint8Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "placeSellOrder",
    values: [InEuint8Struct, InEuint8Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "qtyNotFilled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "shiftBuyBook",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "shiftSellBook",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradeToken",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "baseToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMostCompetitiveBuyQty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMostCompetitiveFillOrderId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMostCompetitiveFillQty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getQtyNotFilled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insertBuyOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insertSellOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastFills", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastShiftBy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "placeBuyOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "placeSellOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "qtyNotFilled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shiftBuyBook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shiftSellBook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tradeToken", data: BytesLike): Result;
}

export interface OrderBook extends BaseContract {
  connect(runner?: ContractRunner | null): OrderBook;
  waitForDeployment(): Promise<this>;

  interface: OrderBookInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  baseToken: TypedContractMethod<[], [string], "view">;

  getMostCompetitiveBuyQty: TypedContractMethod<
    [permission: PermissionStruct],
    [string],
    "view"
  >;

  getMostCompetitiveFillOrderId: TypedContractMethod<
    [permission: PermissionStruct],
    [string],
    "view"
  >;

  getMostCompetitiveFillQty: TypedContractMethod<
    [permission: PermissionStruct],
    [string],
    "view"
  >;

  getQtyNotFilled: TypedContractMethod<
    [permission: PermissionStruct],
    [string],
    "view"
  >;

  insertBuyOrder: TypedContractMethod<
    [orderIdBytes: InEuint8Struct, priceBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;

  insertSellOrder: TypedContractMethod<
    [orderIdBytes: InEuint8Struct, priceBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;

  lastFills: TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, bigint] & { orderId: bigint; quantity: bigint }],
    "view"
  >;

  lastShiftBy: TypedContractMethod<[], [bigint], "view">;

  placeBuyOrder: TypedContractMethod<
    [priceBytes: InEuint8Struct, qtyBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;

  placeSellOrder: TypedContractMethod<
    [priceBytes: InEuint8Struct, qtyBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;

  qtyNotFilled: TypedContractMethod<[], [bigint], "view">;

  shiftBuyBook: TypedContractMethod<[], [void], "nonpayable">;

  shiftSellBook: TypedContractMethod<[], [void], "nonpayable">;

  tradeToken: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "baseToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getMostCompetitiveBuyQty"
  ): TypedContractMethod<[permission: PermissionStruct], [string], "view">;
  getFunction(
    nameOrSignature: "getMostCompetitiveFillOrderId"
  ): TypedContractMethod<[permission: PermissionStruct], [string], "view">;
  getFunction(
    nameOrSignature: "getMostCompetitiveFillQty"
  ): TypedContractMethod<[permission: PermissionStruct], [string], "view">;
  getFunction(
    nameOrSignature: "getQtyNotFilled"
  ): TypedContractMethod<[permission: PermissionStruct], [string], "view">;
  getFunction(
    nameOrSignature: "insertBuyOrder"
  ): TypedContractMethod<
    [orderIdBytes: InEuint8Struct, priceBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "insertSellOrder"
  ): TypedContractMethod<
    [orderIdBytes: InEuint8Struct, priceBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lastFills"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, bigint] & { orderId: bigint; quantity: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "lastShiftBy"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "placeBuyOrder"
  ): TypedContractMethod<
    [priceBytes: InEuint8Struct, qtyBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "placeSellOrder"
  ): TypedContractMethod<
    [priceBytes: InEuint8Struct, qtyBytes: InEuint8Struct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "qtyNotFilled"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "shiftBuyBook"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "shiftSellBook"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "tradeToken"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
