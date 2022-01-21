/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CantBePaid, CantBePaidInterface } from "../CantBePaid";

const _abi = [
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060ac8061001f6000396000f3fe608060405236607157604080517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048083019190915260248201527f4e4f504500000000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b600080fdfea26469706673582212203608017e8572b24a0e8e1375cce4a5bf9e0f646f1ccc051a37b945ceab89c31a64736f6c63430007060033";

export class CantBePaid__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CantBePaid> {
    return super.deploy(overrides || {}) as Promise<CantBePaid>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CantBePaid {
    return super.attach(address) as CantBePaid;
  }
  connect(signer: Signer): CantBePaid__factory {
    return super.connect(signer) as CantBePaid__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CantBePaidInterface {
    return new utils.Interface(_abi) as CantBePaidInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CantBePaid {
    return new Contract(address, _abi, signerOrProvider) as CantBePaid;
  }
}
