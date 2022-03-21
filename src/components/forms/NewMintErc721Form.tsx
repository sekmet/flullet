import { useState, useEffect } from 'react';

import { Erc721ImageUpload } from '@sekmet/react-ipfs-uploader';

import MinterEthereum from '@/components/minters/Ethereum';

export default function NewMintForm({
  ownerAddress,
  chainId,
  contractAddress,
}) {
  const [videoUrl, setVideoUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [ipfsUrl, setIpfsUrl] = useState();
  const [imageHash, setImageHash] = useState();
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    console.log('imageUrl ===> ', imageUrl);
  }, [imageUrl]);

  console.log('owner_address ===> ', ownerAddress);

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create new ERC721 NFT
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                The description will be included on the item's detail page
                underneath its media.
              </p>

              {imageUrl && (
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      className="rounded-t-lg"
                      src={imageUrl}
                      alt="Mintify.xyz"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <div className="mx-auto text-center">
              <p className="mt-3 mb-3 text-lg text-gray-500">
                Image, Video or Audio
              </p>

              <Erc721ImageUpload
                className="mx-auto text-center"
                setUrl={setIpfsUrl}
                setPreview={setImageUrl}
                name={`MintifyV01 NFT #${tokenId}`}
                description={`My MintifyV01 NFT #${tokenId}`}
                externalUrl="https://mintify.xyz"
              />

              {/* <VideoUpload setUrl={setVideoUrl} />
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                {videoUrl}
              </a> */}

              {/* <button
              type="button"
              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-6"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
              </svg>
            </button>                  
        
            <h3 className="mt-2 text-xl font-bold text-gray-400">No Media</h3>
            <p className="mt-3 text-sm text-gray-500"><strong>File types supported:</strong> JPG, PNG, GIF, SVG, MP4, MOV, WEBM, MP3, WAV, OGG.</p> */}
            </div>
          </div>
        </div>
      </div>
      <MinterEthereum
        tokenURI={ipfsUrl}
        chainid={chainId}
        contractAddress={contractAddress}
        setId={setTokenId}
      />
    </>
  );
}
