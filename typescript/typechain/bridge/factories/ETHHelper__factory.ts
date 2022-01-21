/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ETHHelper, ETHHelperInterface } from "../ETHHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_bridge",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "Send",
    type: "event",
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract BridgeRouter",
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
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_to",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "sendTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
    ],
    name: "sendToEVMLike",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWeth",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516104ac3803806104ac8339818101604052604081101561003357600080fd5b5080516020909101516001600160601b0319606083811b821660805282901b1660a0526040805163095ea7b360e01b81526001600160a01b038084166004830152600019602483015291519184169163095ea7b39160448082019260009290919082900301818387803b1580156100a957600080fd5b505af11580156100bd573d6000803e3d6000fd5b50505050505060805160601c60a05160601c6103b16100fb600039806101a652806102cf52508061017052806101ca528061028452506103b16000f3fe60806040526004361061005a5760003560e01c80638b3a145e116100435780638b3a145e146100ca578063e78cea9214610111578063fcdef44c146101265761005a565b80631411b7c01461005f5780633fc8cef31461008c575b600080fd5b61008a6004803603604081101561007557600080fd5b5063ffffffff81351690602001351515610157565b005b34801561009857600080fd5b506100a161016e565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61008a600480360360608110156100e057600080fd5b5063ffffffff8135169073ffffffffffffffffffffffffffffffffffffffff60208201351690604001351515610192565b34801561011d57600080fd5b506100a16101a4565b61008a6004803603606081101561013c57600080fd5b5063ffffffff813516906020810135906040013515156101c8565b61016a8261016433610362565b836101c8565b5050565b7f000000000000000000000000000000000000000000000000000000000000000081565b61019f8361016484610362565b505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561023057600080fd5b505af1158015610244573d6000803e3d6000fd5b5050604080517fa9bd122600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000008116600483015234602483015263ffffffff8916604483015260648201889052861515608483015291517f0000000000000000000000000000000000000000000000000000000000000000909216945063a9bd1226935060a480820193506000929182900301818387803b15801561031a57600080fd5b505af115801561032e573d6000803e3d6000fd5b50506040513392507f7d4b3c5c44bd8008199bb99f184426274cf24f917f4da3485d6a39f894366b109150600090a2505050565b73ffffffffffffffffffffffffffffffffffffffff169056fea2646970667358221220a08af849e5efb43da5c5ed08453c926d308c057cc7909afcec9b99f05577ed1364736f6c63430007060033";

export class ETHHelper__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _weth: string,
    _bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ETHHelper> {
    return super.deploy(_weth, _bridge, overrides || {}) as Promise<ETHHelper>;
  }
  getDeployTransaction(
    _weth: string,
    _bridge: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_weth, _bridge, overrides || {});
  }
  attach(address: string): ETHHelper {
    return super.attach(address) as ETHHelper;
  }
  connect(signer: Signer): ETHHelper__factory {
    return super.connect(signer) as ETHHelper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ETHHelperInterface {
    return new utils.Interface(_abi) as ETHHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ETHHelper {
    return new Contract(address, _abi, signerOrProvider) as ETHHelper;
  }
}
