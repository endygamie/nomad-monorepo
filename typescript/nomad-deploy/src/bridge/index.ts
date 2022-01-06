import * as proxyUtils from '../proxyUtils';
import { checkBridgeDeploy } from './checks';
import * as xAppContracts from '@nomad-xyz/contract-interfaces/dist/bridge';
import { toBytes32, CallData, formatCall } from '../utils';
import fs from 'fs';
import { BridgeDeploy } from './BridgeDeploy';
import TestBridgeDeploy from './TestBridgeDeploy';
import assert from 'assert';

type AnyBridgeDeploy = BridgeDeploy | TestBridgeDeploy;

export type BridgeDeployOutput = {
  bridgeRouter?: string;
};

/**
 * Deploy and configure a cross-chain token bridge system
 * with one BridgeRouter on each of the provided chains
 * with ownership delegated to Nomad governance
 *
 * @param deploys - The list of deploy instances for each chain
 */
export async function deployBridgesComplete(deploys: AnyBridgeDeploy[]) {
  const isTestDeploy: boolean = deploys.filter((c) => c.test).length > 0;

  // deploy BridgeTokens & BridgeRouters
  await Promise.all(
    deploys.map(async (deploy) => {
      // Must be done in order per-deploy.
      // Do not rearrange or parallelize.
      await deployTokenUpgradeBeacon(deploy);
      await deployTokenRegistry(deploy);
      await deployBridgeRouter(deploy);
      await deployEthHelper(deploy);
    }),
  );

  // after all BridgeRouters have been deployed,
  // enroll peer BridgeRouters with each other
  await Promise.all(
    deploys.map(async (deploy) => {
      await enrollAllBridgeRouters(deploy, deploys);
    }),
  );

  // after all peer BridgeRouters have been co-enrolled,
  // transfer ownership of BridgeRouters to Governance
  await Promise.all(
    deploys.map(async (deploy) => {
      await transferOwnershipOfBridge(deploy);
    }),
  );

  await Promise.all(
    deploys.map(async (local) => {
      const remotes = deploys
        .filter((remote) => remote.chain.domain != local.chain.domain)
        .map((remote) => remote.chain.domain);
      await checkBridgeDeploy(local, remotes);
    }),
  );

  if (!isTestDeploy) {
    // output the Bridge deploy information to a subdirectory
    // of the core system deploy config folder
    writeBridgeDeployOutput(deploys);
  }
}

/**
 * Deploy and configure a cross-chain token bridge system
 * with one BridgeRouter on each of the provided chains
 * with ownership delegated to Nomad governance
 *
 * @param deploys - The list of deploy instances for each chain
 */
export async function deployBridgesHubAndSpoke(
  hub: AnyBridgeDeploy,
  spokes: AnyBridgeDeploy[],
) {
  const deploys: AnyBridgeDeploy[] = [hub, ...spokes];
  const isTestDeploy: boolean = deploys.filter((c) => c.test).length > 0;

  // deploy BridgeTokens & BridgeRouters
  await Promise.all(
    deploys.map(async (deploy) => {
      // Must be done in order per-deploy.
      // Do not rearrange or parallelize.
      await deployTokenUpgradeBeacon(deploy);
      await deployTokenRegistry(deploy);
      await deployBridgeRouter(deploy);
      await deployEthHelper(deploy);
    }),
  );

  // after all BridgeRouters have been deployed,
  // enroll the spokes' BridgeRouters on the hub
  await enrollAllBridgeRouters(hub, spokes);

  // enrol the hub's BridgeRouter on all spokes
  await Promise.all(
    spokes.map(async (spoke) => {
      await enrollBridgeRouter(spoke, hub);
    }),
  );

  // after all peer BridgeRouters have been co-enrolled,
  // transfer ownership of BridgeRouters to Governance
  await Promise.all(
    deploys.map(async (deploy) => {
      await transferOwnershipOfBridge(deploy);
    }),
  );

  await Promise.all(
    deploys.map(async (local) => {
      const remotes = deploys
        .filter((remote) => remote.chain.domain !== local.chain.domain)
        .map((remote) => remote.chain.domain);
      await checkBridgeDeploy(local, remotes);
    }),
  );

  if (!isTestDeploy) {
    // output the Bridge deploy information to a subdirectory
    // of the core system deploy config folder
    writeBridgeDeployOutput(deploys);
  }
}

/**
 * Deploy and configure a cross-chain token bridge system
 * with one BridgeRouter on each of the provided chains
 * with ownership delegated to Nomad governance
 *
 * @param deploys - The list of deploy instances for each chain
 */
export async function deployNewChainBridge(
  newDeploy: BridgeDeploy,
  oldDeploys: BridgeDeploy[],
) {
  const isTestDeploy: boolean = newDeploy.test;

  // deploy BridgeTokens & BridgeRouters
  await deployTokenUpgradeBeacon(newDeploy);
  await deployTokenRegistry(newDeploy);
  await deployBridgeRouter(newDeploy);
  await deployEthHelper(newDeploy);

  // after all BridgeRouters have been deployed,
  // enroll peer BridgeRouters with each other
  await enrollAllBridgeRouters(newDeploy, oldDeploys);

  // after all peer BridgeRouters have been co-enrolled,
  // transfer ownership of BridgeRouter to Governance
  await transferOwnershipOfBridge(newDeploy);

  const remoteDomains = oldDeploys.map((deploy) => deploy.chain.domain);
  await checkBridgeDeploy(newDeploy, remoteDomains);

  if (!isTestDeploy) {
    // output the Bridge deploy information to a subdirectory
    // of the core system deploy config folder
    writeBridgeDeployOutput([newDeploy, ...oldDeploys]);
  }
}

/**
 * Deploys the BridgeToken implementation + upgrade beacon
 * on the chain of the given deploy
 * and updates the deploy instance with the new contracts.
 *
 * @param deploy - The deploy instance
 */
export async function deployTokenUpgradeBeacon(deploy: AnyBridgeDeploy) {
  console.log(`deploying ${deploy.chain.name} Token Upgrade Beacon`);

  // no initialize function called
  const initData = '0x';

  deploy.contracts.bridgeToken =
    await proxyUtils.deployProxy<xAppContracts.BridgeToken>(
      'BridgeToken',
      deploy,
      new xAppContracts.BridgeToken__factory(deploy.chain.deployer),
      initData,
    );

  console.log(`deployed ${deploy.chain.name} Token Upgrade Beacon`);
}

/**
 * Deploys the TokenRegistry on the chain of the given deploy and updates
 * the deploy instance with the new contract.
 *
 * @param deploy - The deploy instance
 */
export async function deployTokenRegistry(deploy: AnyBridgeDeploy) {
  console.log(`deploying ${deploy.chain.name} TokenRegistry`);

  const initData =
    xAppContracts.TokenRegistry__factory.createInterface().encodeFunctionData(
      'initialize',
      [
        deploy.contracts.bridgeToken!.beacon.address,
        deploy.coreContractAddresses.xAppConnectionManager,
      ],
    );

  deploy.contracts.tokenRegistry =
    await proxyUtils.deployProxy<xAppContracts.TokenRegistry>(
      'TokenRegistry',
      deploy,
      new xAppContracts.TokenRegistry__factory(deploy.chain.deployer),
      initData,
    );

  assert(
    (await deploy.contracts.tokenRegistry!.proxy.xAppConnectionManager()) ===
      deploy.coreContractAddresses.xAppConnectionManager,
  );
  assert(
    (await deploy.contracts.tokenRegistry!.proxy.tokenBeacon()) ===
      deploy.contracts.bridgeToken!.beacon.address,
  );

  console.log(`deployed ${deploy.chain.name} TokenRegistry`);
}

/**
 * Deploys the BridgeRouter on the chain of the given deploy and updates
 * the deploy instance with the new contract.
 *
 * @param deploy - The deploy instance
 */
export async function deployBridgeRouter(deploy: AnyBridgeDeploy) {
  console.log(`deploying ${deploy.chain.name} BridgeRouter`);

  const initData =
    xAppContracts.BridgeRouter__factory.createInterface().encodeFunctionData(
      'initialize',
      [
        deploy.contracts.tokenRegistry!.proxy.address,
        deploy.coreContractAddresses.xAppConnectionManager,
      ],
    );

  deploy.contracts.bridgeRouter =
    await proxyUtils.deployProxy<xAppContracts.BridgeRouter>(
      'BridgeRouter',
      deploy,
      new xAppContracts.BridgeRouter__factory(deploy.chain.deployer),
      initData,
    );

  assert(
    (await deploy.contracts.bridgeRouter!.proxy.xAppConnectionManager()) ===
      deploy.coreContractAddresses.xAppConnectionManager,
  );
  assert(
    (await deploy.contracts.bridgeRouter!.proxy.tokenRegistry()) ===
      deploy.contracts.tokenRegistry!.proxy.address,
  );

  console.log(`deployed ${deploy.chain.name} BridgeRouter`);
}

/**
 * Deploy the Eth Helper contract if configured.
 *
 * Chains with no WETH configuration will not have an eth helper contract.
 *
 * @param deploy - The deploy instance for the chain on which to deploy the contract
 */
export async function deployEthHelper(deploy: AnyBridgeDeploy) {
  if (!deploy.config.weth) {
    console.log(`skipping ${deploy.chain.name} EthHelper deploy`);
    return;
  }

  console.log(`deploying ${deploy.chain.name} EthHelper`);

  const factory = new xAppContracts.ETHHelper__factory(deploy.chain.deployer);

  deploy.contracts.ethHelper = await factory.deploy(
    deploy.config.weth!,
    deploy.contracts.bridgeRouter?.proxy.address!,
    deploy.overrides,
  );

  await deploy.contracts.ethHelper.deployTransaction.wait(
    deploy.chain.confirmations,
  );
  deploy.verificationInput.push({
    name: `ETH Helper`,
    address: deploy.contracts.ethHelper.address,
    constructorArguments: [
      deploy.config.weth!,
      deploy.contracts.bridgeRouter?.proxy.address!,
    ],
  });
  console.log(`deployed ${deploy.chain.name} EthHelper`);
}

/**
 * Enroll all other chains' BridgeRouters as remote routers
 * to a single chain's BridgeRouter
 *
 * @param deploy - The deploy instance for the chain on which to enroll routers
 * @param allDeploys - Array of all deploy instances for the Bridge deploy
 */
export async function enrollAllBridgeRouters(
  deploy: AnyBridgeDeploy,
  allDeploys: AnyBridgeDeploy[],
) {
  for (let remoteDeploy of allDeploys) {
    if (deploy.chain.domain != remoteDeploy.chain.domain) {
      await enrollBridgeRouter(deploy, remoteDeploy);
    }
  }
}

/**
 * Enroll a single chain's BridgeRouter as remote routers
 * on a single chain's BridgeRouter
 *
 * @param local - The deploy instance for the chain on which to enroll the router
 * @param remote - The deploy instance for the chain to enroll on the local router
 */
export async function enrollBridgeRouter(
  local: AnyBridgeDeploy,
  remote: AnyBridgeDeploy,
) {
  console.log(
    `enrolling ${remote.chain.name} BridgeRouter on ${local.chain.name}`,
  );

  let tx = await local.contracts.bridgeRouter!.proxy.enrollRemoteRouter(
    remote.chain.domain,
    toBytes32(remote.contracts.bridgeRouter!.proxy.address),
    local.overrides,
  );

  await tx.wait(local.chain.confirmations);

  console.log(
    `enrolled ${remote.chain.name} BridgeRouter on ${local.chain.name}`,
  );
}

/**
 * Transfer Ownership of a chain's TokenRegistry to its BridgeRouter,
 * and its BridgeRouter to its GovernanceRouter
 *
 * @param deploy - The deploy instance for the chain
 */
export async function transferOwnershipOfBridge(deploy: AnyBridgeDeploy) {
  // Transfer Ownership of TokenRegistry to BridgeRouter
  console.log(`transfer ownership of ${deploy.chain.name} TokenRegistry`);

  let tx = await deploy.contracts.tokenRegistry!.proxy.transferOwnership(
    deploy.contracts.bridgeRouter!.proxy.address,
    deploy.overrides,
  );

  await tx.wait(deploy.chain.confirmations);

  console.log(`transferred ownership of ${deploy.chain.name} TokenRegistry`);

  // Transfer Ownership of BridgeRouter to governance
  console.log(`transfer ownership of ${deploy.chain.name} BridgeRouter`);

  tx = await deploy.contracts.bridgeRouter!.proxy.transferOwnership(
    deploy.coreContractAddresses.governance.proxy,
    deploy.overrides,
  );

  await tx.wait(deploy.chain.confirmations);

  console.log(`transferred ownership of ${deploy.chain.name} BridgeRouter`);
}

/**
 * Gets enroll bridge call from fresh deploy
 * to existing network. Call
 * should be delegated to governing router.
 *
 * @param newDeploy - Bridge deploy of newly deployed chain
 * @param oldDeploy - Bridge deploy of existing chain
 */
export function getEnrollBridgeCall(
  newDeploy: BridgeDeploy,
  oldDeploy: BridgeDeploy,
): CallData {
  const oldBridgeRouter = oldDeploy.contracts.bridgeRouter!.proxy;
  // Bridge Router address at newly deployed chain
  const newBridgeRouterAddress =
    newDeploy.contracts.bridgeRouter!.proxy!.address;

  // enroll remote (new) Bridge Router at old chain
  return formatCall(oldBridgeRouter, 'enrollRemoteRouter', [
    newDeploy.chain.domain,
    toBytes32(newBridgeRouterAddress),
  ]);
}

function buildSDK(deploy: AnyBridgeDeploy) {
  const config = {
    bridgeRouter: deploy.contracts.bridgeRouter?.proxy!.address,
    tokenRegistry: deploy.contracts.tokenRegistry?.proxy!.address,
    ethHelper: deploy.contracts.ethHelper?.address,
  };
  return JSON.stringify(config, null, 2);
}

/**
 * Outputs the values for bridges that have been deployed.
 *
 * @param deploys - The array of bridge deploys
 */
export function writeBridgeDeployOutput(deploys: AnyBridgeDeploy[]) {
  console.log(`Have ${deploys.length} bridge deploys`);
  if (deploys.length == 0) {
    return;
  }

  // ensure bridge directory exists within core deploy config folder
  const root = `${deploys[0].coreDeployPath}/bridge`;
  fs.mkdirSync(root, { recursive: true });

  // create dir for this bridge deploy's outputs
  const dir = `${root}/${Date.now()}`;
  fs.mkdirSync(dir, { recursive: true });

  // for each deploy, write contracts and verification inputs to file
  for (const deploy of deploys) {
    const name = deploy.chain.name;

    const contracts = deploy.contracts.toJsonPretty();
    fs.writeFileSync(`${dir}/${name}_contracts.json`, contracts);

    fs.writeFileSync(`${dir}/${name}_sdk.json`, buildSDK(deploy));

    fs.writeFileSync(
      `${dir}/${name}_verification.json`,
      JSON.stringify(deploy.verificationInput, null, 2),
    );
  }
}
