import Link from 'next/link';

export default function Item({ asset }) {
  return (
    <div className="p-3 md:w-1/5">
      <Link href="/rarible" as={`/rarible`}>
        <a className="block hover:bg-gray-100 rounded-lg shadow-lg">
          <div className="h-full shadow-md border-2 border-gray-200 rounded-md overflow-hidden">
            <img
              src={
                asset?.meta?.image
                  ? asset?.meta?.image?.url?.ORIGINAL
                  : asset?.meta?.animation
                  ? asset?.meta?.animation?.url?.ORIGINAL
                  : '/assets/images/placeholder.png'
              }
              alt={asset.meta?.description}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
            <div className="p-3">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                {''}
              </h2>
              <h1 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {asset.meta?.name}
              </h1>
              <span className="truncate border-2 shadow-sm border-gray-300 bg-black text-white text-xs font-bold inline-flex items-center px-2 py-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
                Token ID: {`${asset?.tokenId}`.substr(0, 13)}
                {`${asset?.tokenId}`.length > 13 ? '...' : ''}
              </span>
              {asset.rarity_rank ? (
                <span className="ml-1 border-2 shadow-sm border-gray-300 bg-blue-100 text-blue-800 text-xs font-bold inline-flex items-center px-3 py-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
                  Rarity: {asset?.meta?.rarity}
                </span>
              ) : (
                ''
              )}
              <p className="mt-3 text-left">Price: Not available</p>
              <div className="mt-3 flex items-center flex-wrap">
                {/** hover:bg-blue-700 hover:text-white  */}
                <button
                  disabled
                  className="w-full text-gray-600 bg-gray-400 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
