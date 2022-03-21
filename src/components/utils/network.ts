export function getNetworkName(chainId: string) {
  switch (String(chainId)) {
    case '43114':
      return 'AVAX';
    case '56':
      return 'BSC';
    case '1':
      return 'ETH';
    case '250':
      return 'FTM';
    case '1666600000':
      return 'ONE';
    case '1313161555':
      return 'AETH';
    default:
      return 'Unknown';
  }
}

export function getFileType(url_path: string) {
  const size: number = url_path.length;
  return url_path.substring(url_path.lastIndexOf('/') + 1, size);
}

export function ellipsisAddress(address: string) {
  if (!address || address.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 3,
    address.length
  )}`;
}

export const getCurrencyByChainId = (chainId: string) => {
  let result: any | undefined;
  switch (String(chainId)) {
    case '1':
      result = 'ETH';
      break;
    case '3':
      result = 'ETH';
      break;
    case '4':
      result = 'ETH';
      break;
    case '5':
      result = 'ETH';
      break;
    case '42':
      result = 'ETH';
      break;
    case '80001':
      result = 'MATIC';
      break;
    case '4002':
      result = 'FTM';
      break;
    case '338':
      result = 'TCRO';
      break;
    case '43113':
      result = 'AVAX';
      break;
    case '1666700000':
      result = 'ONE';
      break;
    case '1313161555':
      result = 'AETH';
      break;

    default:
      throw Error('Unsupported network');
  }

  return result;
};

export const getNetworkNameByChainId = (chainId: string) => {
  let result: any | undefined;
  switch (String(chainId)) {
    case '1':
      result = 'ethereum';
      break;
    case '3':
      result = 'ropsten';
      break;
    case '4':
      result = 'rinkeby';
      break;
    case '5':
      result = 'goerli';
      break;
    case '42':
      result = 'kovan';
      break;
    case '80001':
      result = 'mumbai';
      break;
    case '4002':
      result = 'fantom-testnet';
      break;
    case '338':
      result = 'cronos-testnet';
      break;
    case '43113':
      result = 'fuji';
      break;
    case '1666700000':
      result = 'harmony-testnet';
      break;
    case '1313161555':
      result = 'aurora-testnet';
      break;

    default:
      throw Error('Unsupported network');
  }

  return result;
};

export const getContractByChainId = (chainId: string) => {
  let result: any | undefined;
  switch (chainId) {
    case '1':
      result = process.env.MAIN_NETWORK;
      break;
    case '3':
      result = process.env.ROPSTEN_NETWORK;
      break;
    case '4':
      result = process.env.RINKEBY_NETWORK;
      break;
    case '5':
      result = process.env.GOERLI_NETWORK;
      break;
    case '42':
      result = process.env.KOVAN_NETWORK;
      break;
    case '80001':
      result = process.env.MUMBAI_NETWORK;
      break;
    case '4002':
      result = process.env.FANTOMTESTNET_NETWORK;
      break;
    case '338':
      result = process.env.CRONOSTESTNET_NETWORK;
      break;
    case '43113':
      result = process.env.FUJI_NETWORK;
      break;
    case '1666700000':
      result = process.env.HARMONYTESTNET_NETWORK;
      break;
    case '1313161555':
      result = process.env.AURORATESTNET_NETWORK;
      break;

    default:
      throw Error('Unsupported network');
  }

  return result;
};

export const getRandomElement = (arr: any[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;

export const getProviderByChainId = (chainId: string) => {
  let result: any | undefined;
  switch (chainId) {
    // case '1':
    //  result = process.env.MAIN_NETWORK;
    //  break;
    case '3':
      result = process.env.ROPSTEN_NETWORK_PROVIDER;
      break;
    case '4':
      result = process.env.RINKEBY_NETWORK_PROVIDER;
      break;
    case '5':
      result = process.env.GOERLI_NETWORK_PROVIDER;
      break;
    case '42':
      result = process.env.KOVAN_NETWORK_PROVIDER;
      break;
    case '80001':
      result = process.env.MUMBAI_NETWORK_PROVIDER;
      break;
    /* case '4002':
      result = process.env.FANTOMTESTNET_NETWORK;
      break;
    case '338':
      result = process.env.CRONOSTESTNET_NETWORK;
      break;
    case '43113':
      result = process.env.FUJI_NETWORK;
      break;
    case '1666700000':
      result = process.env.HARMONYTESTNET_NETWORK;
      break;
    case '1313161555':
      result = process.env.AURORATESTNET_NETWORK;
      break; */

    default:
      throw Error('Unsupported network');
  }

  return result;
};
