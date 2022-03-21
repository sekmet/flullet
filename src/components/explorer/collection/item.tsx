import Link from 'next/link';

import { getNetworkName } from '@/components/utils/network';

export default function Item({ asset }) {
  return (
    <div className="p-4 md:w-1/3">
      <Link href="/collection/[alias]" as={`/collection/${asset.alias}`}>
        <a className="block hover:bg-gray-100 rounded-lg shadow-lg">
          <div className="h-full shadow-md border-2 border-gray-200 rounded-md overflow-hidden">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={asset?.bannerUrl}
              alt={asset.alias}
            />
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                {asset.itemName}
              </h2>
              <h1 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {asset.name}
                <span className="ml-2 border-2 shadow-sm border-gray-300 bg-black text-white text-xs font-bold inline-flex items-center px-2 py-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
                  {getNetworkName(asset.chainId)}
                </span>
                <span className="ml-2 border-2 shadow-sm border-gray-300 bg-blue-100 text-blue-800 text-xs font-bold inline-flex items-center px-3 py-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
                  Marketplace
                </span>
              </h1>
              {/* <p className="mb-3 text-center">
                
          </p>
          <div className="flex items-center flex-wrap ">
            <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
            <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
              <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx={12} cy={12} r={3} />
              </svg>1.2K
            </span>
            <span className="text-gray-600 inline-flex items-center leading-none text-sm">
              <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>6
            </span>
          </div> */}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
