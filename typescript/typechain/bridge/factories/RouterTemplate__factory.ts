/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RouterTemplate,
  RouterTemplateInterface,
} from "../RouterTemplate";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "TypeAReceived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_destinationDomain",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_number",
        type: "uint256",
      },
    ],
    name: "dispatchTypeA",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "_router",
        type: "bytes32",
      },
    ],
    name: "enrollRemoteRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "remotes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "setXAppConnectionManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "xAppConnectionManager",
    outputs: [
      {
        internalType: "contract XAppConnectionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200198438038062001984833981810160405260208110156200003757600080fd5b505162000044816200004b565b50620003ac565b600054610100900460ff1680620000675750620000676200011b565b8062000076575060005460ff16155b620000b35760405162461bcd60e51b815260040180806020018281038252602e81526020018062001956602e913960400191505060405180910390fd5b600054610100900460ff16158015620000df576000805460ff1961ff0019909116610100171660011790555b606580546001600160a01b0319166001600160a01b0384161790556200010462000139565b801562000117576000805461ff00191690555b5050565b60006200013330620001f760201b620009ff1760201c565b15905090565b600054610100900460ff1680620001555750620001556200011b565b8062000164575060005460ff16155b620001a15760405162461bcd60e51b815260040180806020018281038252602e81526020018062001956602e913960400191505060405180910390fd5b600054610100900460ff16158015620001cd576000805460ff1961ff0019909116610100171660011790555b620001d7620001fd565b620001e1620002a5565b8015620001f4576000805461ff00191690555b50565b3b151590565b600054610100900460ff1680620002195750620002196200011b565b8062000228575060005460ff16155b620002655760405162461bcd60e51b815260040180806020018281038252602e81526020018062001956602e913960400191505060405180910390fd5b600054610100900460ff16158015620001e1576000805460ff1961ff0019909116610100171660011790558015620001f4576000805461ff001916905550565b600054610100900460ff1680620002c15750620002c16200011b565b80620002d0575060005460ff16155b6200030d5760405162461bcd60e51b815260040180806020018281038252602e81526020018062001956602e913960400191505060405180910390fd5b600054610100900460ff1615801562000339576000805460ff1961ff0019909116610100171660011790555b600062000345620003a8565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015620001f4576000805461ff001916905550565b3390565b61159a80620003bc6000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c806383bbb80611610076578063ab2dc3f51161005b578063ab2dc3f51461017c578063b49c53a71461023f578063f2fde38b14610268576100a3565b806383bbb8061461013f5780638da5cb5b14610174576100a3565b80631984a330146100a85780633339df96146100d357806341bdc8b514610104578063715018a614610137575b600080fd5b6100d1600480360360408110156100be57600080fd5b5063ffffffff813516906020013561029b565b005b6100db6103a5565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100d16004803603602081101561011a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166103c1565b6100d16104b0565b6101626004803603602081101561015557600080fd5b503563ffffffff166105c7565b60408051918252519081900360200190f35b6100db6105d9565b6100d16004803603608081101561019257600080fd5b63ffffffff8235811692602081013590911691604082013591908101906080810160608201356401000000008111156101ca57600080fd5b8201836020820111156101dc57600080fd5b803590602001918460018302840111640100000000831117156101fe57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506105f5945050505050565b6100d16004803603604081101561025557600080fd5b5063ffffffff813516906020013561079c565b6100d16004803603602081101561027e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661085d565b60006102a683610a09565b905060006102b383610a8b565b90506102bd610ad0565b73ffffffffffffffffffffffffffffffffffffffff1663fa31de018584846040518463ffffffff1660e01b8152600401808463ffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610339578181015183820152602001610321565b50505050905090810190601f1680156103665780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15801561038757600080fd5b505af115801561039b573d6000803e3d6000fd5b5050505050505050565b60655473ffffffffffffffffffffffffffffffffffffffff1681565b6103c9610b6c565b73ffffffffffffffffffffffffffffffffffffffff166103e76105d9565b73ffffffffffffffffffffffffffffffffffffffff161461046957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b606580547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6104b8610b6c565b73ffffffffffffffffffffffffffffffffffffffff166104d66105d9565b73ffffffffffffffffffffffffffffffffffffffff161461055857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b60335460405160009173ffffffffffffffffffffffffffffffffffffffff16907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60976020526000908152604090205481565b60335473ffffffffffffffffffffffffffffffffffffffff1690565b6105fe33610b70565b61066957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f217265706c696361000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b83826106758282610c19565b6106e057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f2172656d6f746520726f75746572000000000000000000000000000000000000604482015290519081900360640190fd5b60006106ec8482610c38565b90506107197fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008216610c5c565b1561072c5761072781610c7b565b610793565b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f2176616c696420616374696f6e00000000000000000000000000000000000000604482015290519081900360640190fd5b50505050505050565b6107a4610b6c565b73ffffffffffffffffffffffffffffffffffffffff166107c26105d9565b73ffffffffffffffffffffffffffffffffffffffff161461084457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b63ffffffff909116600090815260976020526040902055565b610865610b6c565b73ffffffffffffffffffffffffffffffffffffffff166108836105d9565b73ffffffffffffffffffffffffffffffffffffffff161461090557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116610971576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806114816026913960400191505060405180910390fd5b60335460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b803b15155b919050565b63ffffffff811660009081526097602052604090205480610a0457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f2172656d6f746500000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b604080517f0100000000000000000000000000000000000000000000000000000000000000602082015260218082019390935281518082039093018352604101905290565b606554604080517f9fa92f9d000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691639fa92f9d916004808301926020929190829003018186803b158015610b3b57600080fd5b505afa158015610b4f573d6000803e3d6000fd5b505050506040513d6020811015610b6557600080fd5b5051905090565b3390565b606554604080517f5190bc5300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015291516000939290921691635190bc5391602480820192602092909190829003018186803b158015610be757600080fd5b505afa158015610bfb573d6000803e3d6000fd5b505050506040513d6020811015610c1157600080fd5b505192915050565b63ffffffff821660009081526097602052604090205481145b92915050565b815160009060208401610c5364ffffffffff85168284610ce3565b95945050505050565b60006001610c6983610d44565b6001811115610c7457fe5b1492915050565b6000610ca87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316610d7f565b6040805182815290519192507f2b51a16951b17b51a53e06c3041d704232f26354acf317a5b7bfeab23f4ca629919081900360200190a15050565b600080610cf08484610e0e565b9050604051811115610d00575060005b80610d2e577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000915050610d3d565b610d39858585610e80565b9150505b9392505050565b6000610d717fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000008316610e93565b60ff166001811115610c3257fe5b6000610d8a82610c5c565b610ddf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806114a7602e913960400191505060405180910390fd5b610c327fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000831660006020610e99565b81810182811015610c3257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4f766572666c6f7720647572696e67206164646974696f6e2e00000000000000604482015290519081900360640190fd5b606092831b9190911790911b1760181b90565b60d81c90565b600060ff8216610eab57506000610d3d565b610eb484611044565b6bffffffffffffffffffffffff16610ecf8460ff8516610e0e565b1115610fae57610f10610ee185611058565b6bffffffffffffffffffffffff16610ef886611044565b6bffffffffffffffffffffffff16858560ff1661106c565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f73578181015183820152602001610f5b565b50505050905090810190601f168015610fa05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60208260ff16111561100b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a8152602001806114f6603a913960400191505060405180910390fd5b60088202600061101a86611058565b6bffffffffffffffffffffffff1690506000611035836111c7565b91909501511695945050505050565b60181c6bffffffffffffffffffffffff1690565b60781c6bffffffffffffffffffffffff1690565b6060600061107986611210565b915050600061108786611210565b915050600061109586611210565b91505060006110a386611210565b915050838383836040516020018080611530603591397fffffffffffff000000000000000000000000000000000000000000000000000060d087811b821660358401527f2077697468206c656e6774682030780000000000000000000000000000000000603b84015286901b16604a82015260500160216114d582397fffffffffffff000000000000000000000000000000000000000000000000000060d094851b811660218301527f2077697468206c656e677468203078000000000000000000000000000000000060278301529290931b9091166036830152507f2e00000000000000000000000000000000000000000000000000000000000000603c82015260408051601d818403018152603d90920190529b9a5050505050505050505050565b7f80000000000000000000000000000000000000000000000000000000000000007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9091011d90565b600080601f5b600f8160ff1611156112785760ff600882021684901c611235816112e4565b61ffff16841793508160ff1660101461125057601084901b93505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01611216565b50600f5b60ff8160ff1610156112de5760ff600882021684901c61129b816112e4565b61ffff16831792508160ff166000146112b657601083901b92505b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0161127c565b50915091565b60006112f660048360ff16901c611314565b60ff161760081b62ffff001661130b82611314565b60ff1617919050565b600060f08083179060ff82161415611330576030915050610a04565b8060ff1660f11415611346576031915050610a04565b8060ff1660f2141561135c576032915050610a04565b8060ff1660f31415611372576033915050610a04565b8060ff1660f41415611388576034915050610a04565b8060ff1660f5141561139e576035915050610a04565b8060ff1660f614156113b4576036915050610a04565b8060ff1660f714156113ca576037915050610a04565b8060ff1660f814156113e0576038915050610a04565b8060ff1660f914156113f6576039915050610a04565b8060ff1660fa141561140c576061915050610a04565b8060ff1660fb1415611422576062915050610a04565b8060ff1660fc1415611438576063915050610a04565b8060ff1660fd141561144e576064915050610a04565b8060ff1660fe1415611464576065915050610a04565b8060ff1660ff141561147a576066915050610a04565b5091905056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734d65737361676554656d706c6174652f6e756d6265723a2076696577206d757374206265206f66207479706520412e20417474656d7074656420746f20696e646578206174206f666673657420307854797065644d656d566965772f696e646578202d20417474656d7074656420746f20696e646578206d6f7265207468616e20333220627974657354797065644d656d566965772f696e646578202d204f76657272616e2074686520766965772e20536c696365206973206174203078a2646970667358221220d5821412e02e832586147ee44840bde94e388477fcbff64aefe08339f2796bdb64736f6c63430007060033496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564";

export class RouterTemplate__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RouterTemplate> {
    return super.deploy(
      _xAppConnectionManager,
      overrides || {}
    ) as Promise<RouterTemplate>;
  }
  getDeployTransaction(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_xAppConnectionManager, overrides || {});
  }
  attach(address: string): RouterTemplate {
    return super.attach(address) as RouterTemplate;
  }
  connect(signer: Signer): RouterTemplate__factory {
    return super.connect(signer) as RouterTemplate__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RouterTemplateInterface {
    return new utils.Interface(_abi) as RouterTemplateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RouterTemplate {
    return new Contract(address, _abi, signerOrProvider) as RouterTemplate;
  }
}
