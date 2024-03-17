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

export type InEuint8Struct = { data: BytesLike };

export type InEuint8StructOutput = [data: string] & { data: string };

export declare namespace OrderBook {
  export type ExecutionResultStruct = {
    orderId: BigNumberish;
    quantity: BigNumberish;
  };

  export type ExecutionResultStructOutput = [
    orderId: bigint,
    quantity: bigint
  ] & { orderId: bigint; quantity: bigint };
}

export interface OrderBookInterface extends Interface {
  getFunction(
    nameOrSignature: "baseToken" | "placeBuyOrder" | "tradeToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "baseToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBuyOrder",
    values: [InEuint8Struct, InEuint8Struct, InEuint8Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "tradeToken",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "baseToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "placeBuyOrder",
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

  placeBuyOrder: TypedContractMethod<
    [
      orderIdBytes: InEuint8Struct,
      priceBytes: InEuint8Struct,
      qtyBytes: InEuint8Struct
    ],
    [
      [
        OrderBook.ExecutionResultStructOutput,
        OrderBook.ExecutionResultStructOutput
      ]
    ],
    "nonpayable"
  >;

  tradeToken: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "baseToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "placeBuyOrder"
  ): TypedContractMethod<
    [
      orderIdBytes: InEuint8Struct,
      priceBytes: InEuint8Struct,
      qtyBytes: InEuint8Struct
    ],
    [
      [
        OrderBook.ExecutionResultStructOutput,
        OrderBook.ExecutionResultStructOutput
      ]
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "tradeToken"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
