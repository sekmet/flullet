import Link from 'next/link';

import Item from './item';

export default function MyCollection({
  alias,
  assets,
  ownerAddress,
  contractAddress,
  marketAddress,
  chain_id,
}) {
  return (
    <div className="bg-white">
      <section className="text-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4">
            {assets.length === 0 ? (
              <div className="mx-auto text-center">
                <h3 className="mt-2 text-xl font-bold text-gray-400">
                  No NFT Collection
                </h3>
                <p className="mt-1 text-lg text-gray-500">
                  Get started by creating a new NFT collection.
                </p>
                <Link href={`/mint/${ownerAddress}:${chain_id}`}>
                  <button
                    type="button"
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
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

                    <span className="mt-2 block text-sm font-bold text-blue-600">
                      New NFT Collection
                    </span>
                  </button>
                </Link>
                <p className="text-sm text-gray-500">
                  Create, curate, and manage collections of unique NFTs to share
                  and sell.
                </p>
              </div>
            ) : (
              <div className="mx-auto text-center">
                <h3 className="mt-2 text-xl font-bold text-gray-400">
                  Create NFT
                </h3>
                <p className="mt-1 text-lg text-gray-500">
                  Get started by creating a new NFT collection.
                </p>
                <Link href={`/mint/${ownerAddress}:${chain_id}`}>
                  <button
                    type="button"
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
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

                    <span className="mt-2 block text-sm font-bold text-blue-600">
                      New NFT Collection
                    </span>
                  </button>
                </Link>
                <p className="text-sm text-gray-500">
                  Create, curate, and manage collections of unique NFTs to share
                  and sell.
                </p>
              </div>
            )}

            {assets &&
              assets.map((asset) => (
                <Item
                  key={asset.token_id}
                  alias={alias}
                  contractAddress={contractAddress}
                  marketAddress={marketAddress}
                  chainId={chain_id}
                  asset={asset}
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
