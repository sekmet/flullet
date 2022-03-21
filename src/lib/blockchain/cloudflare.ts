import { CloudflareProvider } from '@ethersproject/providers';

function CloudflareConnector() {
  // Connect to mainnet
  const provider = new CloudflareProvider();

  return provider;
}

export { CloudflareConnector };
