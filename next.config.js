const goerli = require('./contracts/goerli-config.js');
const kovan = require('./contracts/kovan-config.js');
const rinkeby = require('./contracts/rinkeby-config.js');
const ropsten = require('./contracts/ropsten-config.js');
const mumbai = require('./contracts/mumbai-config.js');
const fantomtestnet = require('./contracts/fantomtestnet-config.js');
const cronostestnet = require('./contracts/cronostestnet-config.js');
const fuji = require('./contracts/fuji-config.js');
const harmonytestnet = require('./contracts/harmonytestnet-config.js');
const auroratestnet = require('./contracts/auroratestnet-config.js');

const getNetworkProviders = (rpc_provider) => {
  const _providers = String(rpc_provider).split(',');
  if (_providers.length === 1) {
    return [rpc_provider];
  } else {
    return _providers;
  }
} 

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withBundleAnalyzerOptions = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
});


module.exports = {
  withBundleAnalyzerOptions,
  env: {
    GOERLI_NETWORK_PROVIDER: getNetworkProviders(process.env.GOERLI_NETWORK_PROVIDER),
    KOVAN_NETWORK_PROVIDER: getNetworkProviders(process.env.KOVAN_NETWORK_PROVIDER),
    ROPSTEN_NETWORK_PROVIDER: getNetworkProviders(process.env.ROPSTEN_NETWORK_PROVIDER),
    RINKEBY_NETWORK_PROVIDER: getNetworkProviders(process.env.RINKEBY_NETWORK_PROVIDER),
    MUMBAI_NETWORK_PROVIDER: getNetworkProviders(process.env.MUMBAI_NETWORK_PROVIDER),
    GOERLI_NETWORK: goerli,
    KOVAN_NETWORK: kovan,
    ROPSTEN_NETWORK: ropsten,
    RINKEBY_NETWORK: rinkeby,
    MUMBAI_NETWORK: mumbai,
    HARMONYTESTNET_NETWORK: harmonytestnet,
    FANTOMTESTNET_NETWORK: fantomtestnet,
    CRONOSTESTNET_NETWORK: cronostestnet,
    AURORATESTNET_NETWORK: auroratestnet,
    FUJI_NETWORK: fuji,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    NFT_MARKET_CONTRACT_ADDRESS: '0x55BF6eb5D408c067110B78680Ae14602FB2bcf6b',
    NFT721_CONTRACT_ADDRESS: '0x6e039C602ACD659f636D0284cCb79a94d42b7a38',//'0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC',
  }
}
