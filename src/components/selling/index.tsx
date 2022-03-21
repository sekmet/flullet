import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import marketplaceAbi from '@/lib/blockchain/abis/ethereum/marketplace.json';

import Item from './item';

declare let window: any;

export default function MySelling({
  alias,
  assets,
  ownerAddress,
  contractAddress,
  marketAddress,
  chain_id,
}) {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [chainid, setChainId] = useState<any>();
  const [networkname, setNetworkName] = useState<string | undefined>();
  const [owneraddress, setOwner] = useState<any>();

  const abi = new Interface(marketplaceAbi);

  let marketplace;
  let onSale;
  if (marketAddress && abi && provider) {
    marketplace = new Contract(marketAddress, abi, provider);
    onSale = marketplace.fetchMarketItems().then(async function (items) {
      // console.log('Items: ', items);
      return items;
    });
  }

  useEffect(() => {
    // Connect to the Ethereum network
    const _provider = new Web3Provider(window.ethereum, 'any');
    setProvider(_provider);
    (async function () {
      await _provider.send('eth_requestAccounts', []);
      const _signer = _provider.getSigner();
      setSigner(_signer);
      const userAddress = await _signer.getAddress();
      console.log(`Your wallet is ${userAddress} ${ownerAddress}`);
      setOwner(userAddress);
      const { name, chainId } = await _provider.getNetwork();
      setNetworkName(name);
      setChainId(chainId);
    })();
  }, []);

  console.log('onSale: ', onSale);

  return (
    <div className="bg-white">
      <section className="text-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4">
            {assets &&
              assets.map((asset) => (
                <Item
                  key={asset.item_id}
                  alias={alias}
                  contractAddress={contractAddress}
                  marketAddress={marketAddress}
                  asset={asset}
                  chainId={chain_id}
                />
              ))}
          </div>
        </div>
        {/*! loading && assets.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => loadAssets()}
            className="bg-white w-full hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
          >
            Load More
          </button>
        </div>
      ) */}
      </section>
    </div>
  );
}
