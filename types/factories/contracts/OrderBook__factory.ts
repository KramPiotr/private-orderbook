/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { OrderBook, OrderBookInterface } from "../../contracts/OrderBook";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tradeToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "baseToken",
    outputs: [
      {
        internalType: "contract IFHERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lastFills",
    outputs: [
      {
        internalType: "euint8",
        name: "orderId",
        type: "uint256",
      },
      {
        internalType: "euint8",
        name: "quantity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastShiftBy",
    outputs: [
      {
        internalType: "euint8",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint8",
        name: "orderIdBytes",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint8",
        name: "priceBytes",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint8",
        name: "qtyBytes",
        type: "tuple",
      },
    ],
    name: "placeBuyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "shiftSellBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeToken",
    outputs: [
      {
        internalType: "contract IFHERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200193e3803806200193e8339818101604052810190620000379190620002b4565b600160008190555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000d36000620000f960201b60201c565b601481905550620000eb6001620000f960201b60201c565b60158190555050506200057a565b60006200010e8260006200011560201b60201c565b9050919050565b60006060608073ffffffffffffffffffffffffffffffffffffffff166319e1c5c46200014786620001cc60201b60201c565b856040518363ffffffff1660e01b815260040162000167929190620003b3565b600060405180830381865afa15801562000185573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190620001b0919062000529565b9050620001c3816200022d60201b60201c565b91505092915050565b6060602067ffffffffffffffff811115620001ec57620001eb620003f1565b5b6040519080825280601f01601f1916602001820160405280156200021f5781602001600182028036833780820191505090505b509050816020820152919050565b600060208201519050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200027c826200024f565b9050919050565b6200028e816200026f565b81146200029a57600080fd5b50565b600081519050620002ae8162000283565b92915050565b60008060408385031215620002ce57620002cd62000245565b5b6000620002de858286016200029d565b9250506020620002f1858286016200029d565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015620003375780820151818401526020810190506200031a565b60008484015250505050565b6000601f19601f8301169050919050565b60006200036182620002fb565b6200036d818562000306565b93506200037f81856020860162000317565b6200038a8162000343565b840191505092915050565b600060ff82169050919050565b620003ad8162000395565b82525050565b60006040820190508181036000830152620003cf818562000354565b9050620003e06020830184620003a2565b9392505050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200042b8262000343565b810181811067ffffffffffffffff821117156200044d576200044c620003f1565b5b80604052505050565b6000620004626200023b565b905062000470828262000420565b919050565b600067ffffffffffffffff821115620004935762000492620003f1565b5b6200049e8262000343565b9050602081019050919050565b6000620004c2620004bc8462000475565b62000456565b905082815260208101848484011115620004e157620004e0620003ec565b5b620004ee84828562000317565b509392505050565b600082601f8301126200050e576200050d620003e7565b5b815162000520848260208601620004ab565b91505092915050565b60006020828403121562000542576200054162000245565b5b600082015167ffffffffffffffff8111156200056357620005626200024a565b5b6200057184828501620004f6565b91505092915050565b6113b4806200058a6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80633788364c14610067578063388c982914610098578063740cd32b146100b6578063c55dae63146100c0578063d83678ac146100de578063fc2191f0146100fc575b600080fd5b610081600480360381019061007c9190610cad565b610118565b60405161008f929190610d15565b60405180910390f35b6100a0610142565b6040516100ad9190610d3e565b60405180910390f35b6100be610148565b005b6100c861029a565b6040516100d59190610dce565b60405180910390f35b6100e66102c0565b6040516100f39190610dce565b60405180910390f35b61011660048036038101906101119190610e0d565b6102e6565b005b600f816002811061012857600080fd5b600202016000915090508060000154908060010154905082565b60135481565b6000601354905060005b600160026101609190610ef0565b60ff168160ff161015610296576000610184601454846104ef90919063ffffffff16565b905061019c8161019685601554610503565b85610517565b925060006014549050600060145490506000600160026101bc9190610ef0565b90505b60008160ff161061028557600060098260ff16600281106101e3576101e2610f25565b5b60030201600201549050600060098360ff166002811061020657610205610f25565b5b6003020160010154905061021b868684610517565b60098460ff166002811061023257610231610f25565b5b6003020160020181905550610248868583610517565b60098460ff166002811061025f5761025e610f25565b5b60030201600101819055508194508093505050808061027d90610f54565b9150506101bf565b505050508080600101915050610152565b5050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6102ee610595565b6000610302846102fd90611125565b6105db565b905060006103188361031390611125565b6105db565b9050600061032e8561032990611125565b6105db565b90506000601454905060005b600260ff168160ff1610156104d657600061037c60098360ff166002811061036557610364610f25565b5b6003020160020154856105f190919063ffffffff16565b905060006103a88660098560ff166002811061039b5761039a610f25565b5b6003020160010154610605565b905060006103b98383601454610517565b90506103c58782610503565b96506103ef60098560ff16600281106103e1576103e0610f25565b5b600302016001015482610503565b60098560ff166002811061040657610405610f25565b5b6003020160010181905550600061041f8660155461067e565b905061045e61045760145460098860ff166002811061044157610440610f25565b5b600302016001015461069290919063ffffffff16565b8288610517565b9550604051806040016040528060098760ff166002811061048257610481610f25565b5b6003020160000154815260200183815250600f8660ff16600281106104aa576104a9610f25565b5b60020201600082015181600001556020820151816001015590505050505050808060010191505061033a565b5080601381905550505050506104ea6106a6565b505050565b60006104fb83836106b0565b905092915050565b600061050f8383610729565b905092915050565b6000610522846107a2565b6105335761053060006107af565b93505b61053c836107c3565b61054d5761054a60006107d0565b92505b610556826107c3565b6105675761056460006107d0565b91505b600084905060008490506000849050600061058560008585856107e4565b9050809450505050509392505050565b6002600054036105d1576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600081905550565b60006105ea826000015161089c565b9050919050565b60006105fd83836108b0565b905092915050565b6000610610836107c3565b6106215761061e60006107d0565b92505b61062a826107c3565b61063b5761063860006107d0565b91505b60008390506000839050600061067060008484608073ffffffffffffffffffffffffffffffffffffffff16635211c679610929565b905080935050505092915050565b600061068a83836109bd565b905092915050565b600061069e8383610a35565b905092915050565b6001600081905550565b60006106bb836107c3565b6106cc576106c960006107d0565b92505b6106d5826107c3565b6106e6576106e360006107d0565b91505b60008390506000839050600061071b60008484608073ffffffffffffffffffffffffffffffffffffffff1663874b1c10610929565b905080935050505092915050565b6000610734836107c3565b6107455761074260006107d0565b92505b61074e826107c3565b61075f5761075c60006107d0565b91505b60008390506000839050600061079460008484608073ffffffffffffffffffffffffffffffffffffffff1663cc2cbeff610929565b905080935050505092915050565b6000808214159050919050565b60006107bc826000610aae565b9050919050565b6000808214159050919050565b60006107dd826000610aae565b9050919050565b60006060608073ffffffffffffffffffffffffffffffffffffffff1663c2d969528761080f88610b50565b61081888610b50565b61082188610b50565b6040518563ffffffff1660e01b815260040161084094939291906111c6565b600060405180830381865afa15801561085d573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906108869190611290565b905061089181610bad565b915050949350505050565b60006108a9826000610bbb565b9050919050565b60006108bb836107c3565b6108cc576108c960006107d0565b92505b6108d5826107c3565b6108e6576108e360006107d0565b91505b60008390506000839050600061091b60008484608073ffffffffffffffffffffffffffffffffffffffff1663650de1cf610929565b905080935050505092915050565b6000606083838861093989610b50565b61094289610b50565b6040518463ffffffff1660e01b8152600401610960939291906112d9565b600060405180830381865afa15801561097d573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906109a69190611290565b90506109b181610c55565b91505095945050505050565b60006109c8836107c3565b6109d9576109d660006107d0565b92505b6109e2826107c3565b6109f3576109f060006107d0565b91505b600083905060008390506000610a2760008484608073ffffffffffffffffffffffffffffffffffffffff16622df619610929565b905080935050505092915050565b6000610a40836107c3565b610a5157610a4e60006107d0565b92505b610a5a826107c3565b610a6b57610a6860006107d0565b91505b600083905060008390506000610aa060008484608073ffffffffffffffffffffffffffffffffffffffff166392348b34610929565b905080935050505092915050565b60006060608073ffffffffffffffffffffffffffffffffffffffff166319e1c5c4610ad886610b50565b856040518363ffffffff1660e01b8152600401610af692919061131e565b600060405180830381865afa158015610b13573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610b3c9190611290565b9050610b4781610bad565b91505092915050565b6060602067ffffffffffffffff811115610b6d57610b6c610f93565b5b6040519080825280601f01601f191660200182016040528015610b9f5781602001600182028036833780820191505090505b509050816020820152919050565b600060208201519050919050565b60006060608073ffffffffffffffffffffffffffffffffffffffff16635fa55ca784866040518363ffffffff1660e01b8152600401610bfb92919061134e565b600060405180830381865afa158015610c18573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610c419190611290565b9050610c4c81610bad565b91505092915050565b600060208201519050919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610c8a81610c77565b8114610c9557600080fd5b50565b600081359050610ca781610c81565b92915050565b600060208284031215610cc357610cc2610c6d565b5b6000610cd184828501610c98565b91505092915050565b6000819050919050565b6000610cff610cfa610cf584610c77565b610cda565b610c77565b9050919050565b610d0f81610ce4565b82525050565b6000604082019050610d2a6000830185610d06565b610d376020830184610d06565b9392505050565b6000602082019050610d536000830184610d06565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d94610d8f610d8a84610d59565b610cda565b610d59565b9050919050565b6000610da682610d79565b9050919050565b6000610db882610d9b565b9050919050565b610dc881610dad565b82525050565b6000602082019050610de36000830184610dbf565b92915050565b600080fd5b600060208284031215610e0457610e03610de9565b5b81905092915050565b600080600060608486031215610e2657610e25610c6d565b5b600084013567ffffffffffffffff811115610e4457610e43610c72565b5b610e5086828701610dee565b935050602084013567ffffffffffffffff811115610e7157610e70610c72565b5b610e7d86828701610dee565b925050604084013567ffffffffffffffff811115610e9e57610e9d610c72565b5b610eaa86828701610dee565b9150509250925092565b600060ff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610efb82610eb4565b9150610f0683610eb4565b9250828203905060ff811115610f1f57610f1e610ec1565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000610f5f82610eb4565b915060008203610f7257610f71610ec1565b5b600182039050919050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610fcb82610f82565b810181811067ffffffffffffffff82111715610fea57610fe9610f93565b5b80604052505050565b6000610ffd610c63565b90506110098282610fc2565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff82111561103857611037610f93565b5b61104182610f82565b9050602081019050919050565b82818337600083830152505050565b600061107061106b8461101d565b610ff3565b90508281526020810184848401111561108c5761108b611018565b5b61109784828561104e565b509392505050565b600082601f8301126110b4576110b3611013565b5b81356110c484826020860161105d565b91505092915050565b6000602082840312156110e3576110e2610f7d565b5b6110ed6020610ff3565b9050600082013567ffffffffffffffff81111561110d5761110c61100e565b5b6111198482850161109f565b60008301525092915050565b600061113136836110cd565b9050919050565b61114181610eb4565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611181578082015181840152602081019050611166565b60008484015250505050565b600061119882611147565b6111a28185611152565b93506111b2818560208601611163565b6111bb81610f82565b840191505092915050565b60006080820190506111db6000830187611138565b81810360208301526111ed818661118d565b90508181036040830152611201818561118d565b90508181036060830152611215818461118d565b905095945050505050565b600061123361122e8461101d565b610ff3565b90508281526020810184848401111561124f5761124e611018565b5b61125a848285611163565b509392505050565b600082601f83011261127757611276611013565b5b8151611287848260208601611220565b91505092915050565b6000602082840312156112a6576112a5610c6d565b5b600082015167ffffffffffffffff8111156112c4576112c3610c72565b5b6112d084828501611262565b91505092915050565b60006060820190506112ee6000830186611138565b8181036020830152611300818561118d565b90508181036040830152611314818461118d565b9050949350505050565b60006040820190508181036000830152611338818561118d565b90506113476020830184611138565b9392505050565b60006040820190506113636000830185611138565b8181036020830152611375818461118d565b9050939250505056fea2646970667358221220b96265b822f0532f3df00a490cd3017cf9f5b79da171130d1d40ca94273ec27a64736f6c63430008180033";

type OrderBookConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrderBookConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrderBook__factory extends ContractFactory {
  constructor(...args: OrderBookConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _tradeToken: AddressLike,
    _baseToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_tradeToken, _baseToken, overrides || {});
  }
  override deploy(
    _tradeToken: AddressLike,
    _baseToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_tradeToken, _baseToken, overrides || {}) as Promise<
      OrderBook & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): OrderBook__factory {
    return super.connect(runner) as OrderBook__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderBookInterface {
    return new Interface(_abi) as OrderBookInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): OrderBook {
    return new Contract(address, _abi, runner) as unknown as OrderBook;
  }
}
