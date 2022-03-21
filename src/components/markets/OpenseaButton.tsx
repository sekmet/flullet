import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/markets/ModalOpensea'));

export default function OpenSeaButton({
  chainId,
  contractAddress,
  tokenId,
  tokenUri,
}) {
  const [isOpen, setOpen] = useState<boolean | undefined>(false);

  const orderItem = async (event, tokenId) => {
    event.preventDefault();
    setOpen(true);
    console.log(tokenId);
  };

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={(e) => orderItem(e, tokenId)}
        className="w-full mb-1 text-gray-600 bg-gray-400 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        List on OpenSea
      </button>
      <Modal
        isOpen={isOpen}
        setOpen={setOpen}
        chainId={chainId}
        tokenId={tokenId}
        tokenUri={tokenUri}
        contractAddress={contractAddress}
      />
    </>
  );
}
