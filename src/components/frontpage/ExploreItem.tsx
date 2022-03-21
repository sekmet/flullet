import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import erc721abi from '@/lib/blockchain/abis/erc721.json';

declare let window: any;

export default function SellItem({ contractAddress, marketAddress, asset }) {
  const [provider, setProvider] = useState<any>();
  const [tokenuri, setTokenUri] = useState<any>();
  const [tokenInfo, setTokenInfo] = useState<any>({});
  const [tokenid, setTokenId] = useState<any>();

  const alias = 'selling';

  const abi = new Interface(erc721abi);
  // This can be an address or an ENS name
  const address = contractAddress || process.env.NFT721_CONTRACT_ADDRESS; // "0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC";
  const market_address = marketAddress || process.env.MARKET_CONTRACT_ADDRESS; // "0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC";
  // Read-Only; By connecting to a Provider, allows:
  // - Any constant function
  // - Querying Filters
  // - Populating Unsigned Transactions for non-constant methods
  // - Estimating Gas for non-constant (as an anonymous sender)
  // - Static Calling non-constant methods (as anonymous sender)
  const erc721 = new Contract(address, abi, provider);

  const tokenId = String(
    `${BigNumber.from(asset.tokenId).toString()}`.replace(/"/g, '')
  );
  const itemId = String(
    `${BigNumber.from(asset.itemId).toString()}`.replace(/"/g, '')
  );
  const sellingPrice = String(
    `${BigNumber.from(asset.price).toString()}`.replace(/"/g, '')
  );
  const sellingCurrency = String(`${'ETH'}`.replace(/"/g, ''));

  useEffect(() => {
    const _provider = new Web3Provider(window.ethereum, 'any');
    setProvider(_provider);
    setTokenId(tokenId);

    const fetchTokenInfo = async () => {
      const _tokenInfo = await fetch(tokenuri).then((res) => res.json());
      setTokenInfo(_tokenInfo);
      // console.log('tokenInfo ===> ', _tokenInfo);
    };

    tokenuri && fetchTokenInfo();
  }, [asset, tokenId, tokenuri]);

  erc721
    .tokenURI(tokenId)
    .then(function (result) {
      // console.log('tokenURI ===> ', result);
      setTokenUri(result);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div className="group relative mb-9">
      <div className="w-full h-48 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-3 sm:aspect-h-3">
        <img
          src={
            tokenInfo?.image
              ? tokenInfo.image
              : '/assets/images/placeholder.png'
          }
          alt="Selling Item"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">
        <a
          href={`/asset/${BigNumber.from(
            asset.itemId
          ).toString()}-${BigNumber.from(asset.tokenId).toString()}`}
        >
          <span className="absolute inset-0" />
          {tokenInfo?.name ? tokenInfo?.name : 'Mintify.xyz'}
        </a>
      </h3>
      <p className="mt-1 text-sm font-bold text-gray-500">
        {BigNumber.from(asset.price).toString()} ETH
      </p>
    </div>
  );
}
