import * as rinkeby from '../../../config/testnets/rinkeby';
import * as kovan from '../../../config/testnets/kovan';
import { ExistingCoreDeploy } from '../../../src/core/CoreDeploy';
import { ExistingBridgeDeploy } from '../../../src/bridge/BridgeDeploy';
import { getPathToDeployConfig } from '../../../src/verification/readDeployOutput';
import { deploysToSDK } from '../../../src/incremental/utils';
import { enrollSpoke } from '../../../src/incremental';
import { NomadContext } from '@nomad-xyz/sdk';

const path = getPathToDeployConfig('staging');

// Instantiate existing governor deploys on Rinkeby
const rinkebyCoreDeploy = ExistingCoreDeploy.withPath(
  rinkeby.chain,
  rinkeby.stagingConfig,
  path,
);
const rinkebyBridgeDeploy = new ExistingBridgeDeploy(
  rinkeby.chain,
  rinkeby.bridgeConfig,
  path,
);
const rinkebyDomain = deploysToSDK(rinkebyCoreDeploy, rinkebyBridgeDeploy);

// Enroll Kovan as spoke to Rinkeby hub (reinstantiate kovan objects now with
// addresses)
const kovanExistingCoreDeploy = ExistingCoreDeploy.withPath(
  kovan.chain,
  kovan.devConfig,
  path,
);
const kovanExistingBridgeDeploy = new ExistingBridgeDeploy(
  kovan.chain,
  kovan.bridgeConfig,
  path,
);
const kovanDomain = deploysToSDK(
  kovanExistingCoreDeploy,
  kovanExistingBridgeDeploy,
);

const sdk = NomadContext.fromDomains([rinkebyDomain, kovanDomain]);

enrollSpoke(sdk, kovanDomain.id, kovan.stagingConfig.watchers);
