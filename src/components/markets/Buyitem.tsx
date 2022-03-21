import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { Web3Provider } from '@ethersproject/providers';

import Modal from '@/components/layout/Modal';
import marketplaceAbi from '@/lib/blockchain/abis/ethereum/marketplace.json';

declare let window: any;

export default function MarketplaceBuyItem({ contractAddress, itemId }) {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [tokenid, setTokenId] = useState<any>();
  const [chain_id, setChainId] = useState<any>();
  const [isOpen, setOpen] = useState(false);
  const [network_name, setNetworkName] = useState<string | undefined>();

  const abi = new Interface(marketplaceAbi);

  const orderItem = async (event, itemId) => {
    event.preventDefault();
    console.log('orderItem', itemId);
    setOpen(true);
  };

  useEffect(() => {
    console.log('MarketplaceBuyItem: ', contractAddress, itemId);
    const _provider = new Web3Provider(window.ethereum, 'any');
    setProvider(_provider);
    (async function () {
      await _provider.send('eth_requestAccounts', []);
      const _signer = _provider.getSigner();
      setSigner(_signer);
      const userAddress = await _signer.getAddress();
      console.log(`Your wallet is ${userAddress}`);
      // setOwner(userAddress);
      const { name, chainId } = await _provider.getNetwork();
      setNetworkName(name);
      setChainId(chainId);
    })();
  }, []);

  return (
    <>
      <button
        onClick={(e) => orderItem(e, itemId)}
        className="w-full text-gray-600 bg-gray-400 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy Item
      </button>
      <Modal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
