import { AlchemyProvider } from '@ethersproject/providers';

function PolygonConnector() {
  // Connect to mainnet with a api key
  const provider = new AlchemyProvider('mumbai', process.env.ALCHEMY_KEY);
  // var ethers = require('ethers');
  // var provider = ethers.providers.getDefaultProvider('rinkeby');

  // Connect to the Alchemy WebSocket endpoints with a WebSocketProvider
  // provider = AlchemyProvider.getWebSocketProvider()

  return provider;
}

export { PolygonConnector };
