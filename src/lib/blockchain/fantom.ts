const Web3 = require('web3');

const provider_url = 'https://rpc.testnet.fantom.network/';

function FantomConnector() {
  const web3Provider = new Web3.providers.HttpProvider(provider_url);
  const provider = new Web3(web3Provider);

  return provider;
}

export { FantomConnector };
