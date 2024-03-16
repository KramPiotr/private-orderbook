/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  Precompiles,
  PrecompilesInterface,
} from "../../../../@fhenixprotocol/contracts/FheOS.sol/Precompiles";

const _abi = [
  {
    inputs: [],
    name: "Fheos",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e3610052600b82828239805160001a607314610045577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060335760003560e01c806313d8d464146038575b600080fd5b603e6052565b604051604991906094565b60405180910390f35b608081565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006080826057565b9050919050565b608e816077565b82525050565b600060208201905060a760008301846087565b9291505056fea26469706673582212207ed7484c054a7823252448e7f4b9782b98eef150e5ad23cef05e45a3b542e91f64736f6c63430008180033";

type PrecompilesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PrecompilesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Precompiles__factory extends ContractFactory {
  constructor(...args: PrecompilesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Precompiles & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Precompiles__factory {
    return super.connect(runner) as Precompiles__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PrecompilesInterface {
    return new Interface(_abi) as PrecompilesInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Precompiles {
    return new Contract(address, _abi, runner) as unknown as Precompiles;
  }
}
