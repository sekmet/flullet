import { InfuraProvider } from '@ethersproject/providers';

function InfuraConnector() {
  // Connect to mainnet with a Project ID and Project Secret
  const provider = new InfuraProvider('rinkeby', {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  });
  // var ethers = require('ethers');
  // var provider = ethers.providers.getDefaultProvider('rinkeby');

  // Connect to the INFURA WebSocket endpoints with a WebSocketProvider
  // provider = InfuraProvider.getWebSocketProvider()

  return provider;
}

export { InfuraConnector };
