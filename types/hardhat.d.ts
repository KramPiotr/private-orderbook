/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Permissioned",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Permissioned__factory>;
    getContractFactory(
      name: "FHE",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FHE__factory>;
    getContractFactory(
      name: "FheOps",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FheOps__factory>;
    getContractFactory(
      name: "Precompiles",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Precompiles__factory>;
    getContractFactory(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Errors__factory>;
    getContractFactory(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Errors__factory>;
    getContractFactory(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Errors__factory>;
    getContractFactory(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC5267__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ECDSA__factory>;
    getContractFactory(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712__factory>;
    getContractFactory(
      name: "Math",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Math__factory>;
    getContractFactory(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>;
    getContractFactory(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ShortStrings__factory>;
    getContractFactory(
      name: "Strings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Strings__factory>;
    getContractFactory(
      name: "FHERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FHERC20__factory>;
    getContractFactory(
      name: "IFHERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFHERC20__factory>;
    getContractFactory(
      name: "IOrderBook",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOrderBook__factory>;
    getContractFactory(
      name: "OrderBook",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrderBook__factory>;

    getContractAt(
      name: "Permissioned",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Permissioned>;
    getContractAt(
      name: "FHE",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FHE>;
    getContractAt(
      name: "FheOps",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FheOps>;
    getContractAt(
      name: "Precompiles",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Precompiles>;
    getContractAt(
      name: "IERC1155Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Errors>;
    getContractAt(
      name: "IERC20Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Errors>;
    getContractAt(
      name: "IERC721Errors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Errors>;
    getContractAt(
      name: "IERC5267",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC5267>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ECDSA",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ECDSA>;
    getContractAt(
      name: "EIP712",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712>;
    getContractAt(
      name: "Math",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Math>;
    getContractAt(
      name: "ReentrancyGuard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuard>;
    getContractAt(
      name: "ShortStrings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ShortStrings>;
    getContractAt(
      name: "Strings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Strings>;
    getContractAt(
      name: "FHERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FHERC20>;
    getContractAt(
      name: "IFHERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IFHERC20>;
    getContractAt(
      name: "IOrderBook",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOrderBook>;
    getContractAt(
      name: "OrderBook",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OrderBook>;

    deployContract(
      name: "Permissioned",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Permissioned>;
    deployContract(
      name: "FHE",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FHE>;
    deployContract(
      name: "FheOps",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FheOps>;
    deployContract(
      name: "Precompiles",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Precompiles>;
    deployContract(
      name: "IERC1155Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "Math",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "Strings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "FHERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FHERC20>;
    deployContract(
      name: "IFHERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFHERC20>;
    deployContract(
      name: "IOrderBook",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOrderBook>;
    deployContract(
      name: "OrderBook",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OrderBook>;

    deployContract(
      name: "Permissioned",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Permissioned>;
    deployContract(
      name: "FHE",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FHE>;
    deployContract(
      name: "FheOps",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FheOps>;
    deployContract(
      name: "Precompiles",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Precompiles>;
    deployContract(
      name: "IERC1155Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC1155Errors>;
    deployContract(
      name: "IERC20Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Errors>;
    deployContract(
      name: "IERC721Errors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Errors>;
    deployContract(
      name: "IERC5267",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "ECDSA",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "EIP712",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "Math",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "ReentrancyGuard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "ShortStrings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "Strings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "FHERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FHERC20>;
    deployContract(
      name: "IFHERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFHERC20>;
    deployContract(
      name: "IOrderBook",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOrderBook>;
    deployContract(
      name: "OrderBook",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OrderBook>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}