const Web3 = require('web3');

const provider_url = 'https://cronos-testnet-3.crypto.org:8545';

function CronosConnector() {
  const web3Provider = new Web3.providers.HttpProvider(provider_url);
  const provider = new Web3(web3Provider);

  return provider;
}

export { CronosConnector };
