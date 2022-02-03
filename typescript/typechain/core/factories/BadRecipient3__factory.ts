/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BadRecipient3, BadRecipient3Interface } from "../BadRecipient3";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061012f806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063ab2dc3f514602d575b600080fd5b60ea60048036036080811015604157600080fd5b63ffffffff823581169260208101359091169160408201359190810190608081016060820135640100000000811115607857600080fd5b820183602082011115608957600080fd5b8035906020019184600183028401116401000000008311171560aa57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955060ec945050505050565b005b62abcdef60005260206000fdfea264697066735822122003d004d9ca2a21c98d717e1cab5e2538361f403802ae7808d869016a687ef80264736f6c63430007060033";

export class BadRecipient3__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BadRecipient3> {
    return super.deploy(overrides || {}) as Promise<BadRecipient3>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BadRecipient3 {
    return super.attach(address) as BadRecipient3;
  }
  connect(signer: Signer): BadRecipient3__factory {
    return super.connect(signer) as BadRecipient3__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BadRecipient3Interface {
    return new utils.Interface(_abi) as BadRecipient3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BadRecipient3 {
    return new Contract(address, _abi, signerOrProvider) as BadRecipient3;
  }
}
