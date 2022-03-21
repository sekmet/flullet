import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';

import ExploreSelling from '@/components/frontpage/Explore';
import HeroSection from '@/components/frontpage/Hero';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { getContractByChainId } from '@/components/utils/network';
import marketplaceAbi from '@/lib/blockchain/abis/ethereum/marketplace.json';

declare let window: any;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Index = () => {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [chainid, setChainId] = useState<any>();
  const [onSaleItems, setOnSale] = useState<any>([]);
  const [networkname, setNetworkName] = useState<string | undefined>();
  const router = useRouter();

  const abi = new Interface(marketplaceAbi);

  // get network contracts
  const { nftaddress, nftmarketaddress } = getContractByChainId(String(4));

  useEffect(() => {
    async function fetchData() {
      // Connect to the Ethereum network
      const _provider = new Web3Provider(window.ethereum, 'any');
      setProvider(_provider);

      await _provider.send('eth_requestAccounts', []);
      const _signer = _provider.getSigner();
      setSigner(_signer);
      const userAddress = await _signer.getAddress();
      console.log(`Your wallet is ${userAddress}`);

      const { name, chainId } = await _provider.getNetwork();
      setNetworkName(name);
      setChainId(chainId);

      if (nftmarketaddress && abi && _provider) {
        const marketplace = new Contract(nftmarketaddress, abi, _provider);
        const onSale = marketplace.fetchMarketItems().then((items) => {
          console.log('On Sale: ', items);
          setOnSale(items);
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <Header section={''} network={''} hasSubmenu={false} />
      <HeroSection />
      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:py-8 sm:px-3 lg:px-4">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2
                id="category-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                Discover new collections
              </h2>
              <a
                href="http://mintify.test/collections"
                className="hidden text-sm font-bold text-blue-600 hover:text-blue-500 sm:block"
              >
                Browse all collections<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
              <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                <img
                  src="https://cdn.nftkey.app/nft-collections/fantomwheelz/0x493b25661e5d4636fe0ab1f1573f1ddfcd91852ebe3e240e91e92fd8aeba96bf-thumb.png"
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  className="object-center object-cover group-hover:opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="p-6 flex items-end">
                  <div>
                    <h3 className="text-1xl font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Fantom Wheelz
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Check now
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
                <img
                  src="https://cdn.nftkey.app/nft-collections/creaturesofthecave2/0x0c18ac7bb2bbdd094bb92032a855785a5bb94df9c0949f8d08f569e057805258-thumb.png"
                  alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                  className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-50"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="p-6 flex items-end sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Accessories
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Check now
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
                <img
                  src="https://cdn.nftkey.app/nft-collections/creaturesofthecaveserum/0x1358637071ee33ae809cee22138154f06ef61cadb6a18e92094156fba78670c1-thumb.png"
                  alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                  className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="p-6 flex items-end sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Workspace
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Check now
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <a
                href="http://mintify.test/collections"
                className="block text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                Browse all collections<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Explore section */}
        <ExploreSelling
          provider={provider}
          chainId="4"
          onSaleItems={onSaleItems}
        />

        {/* Featured section */}
        <section aria-labelledby="cause-heading">
          <div className="relative bg-gray-800 py-16 px-6 sm:py-20 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/assets/images/fpbanner-4.jpg"
                alt="Create, discover, collect and trade NFTs on multiple chains"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gray-900 bg-opacity-50"
            />
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <h2
                id="cause-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Create, discover, collect and trade NFTs on multiple chains
              </h2>
              <p className="mt-3 text-xl text-white">
                We're committed to responsible, sustainable, and ethical
                manufacturing. Our small-scale approach allows us to focus on
                quality and reduce our impact. We're doing our best to delay the
                inevitable heat-death of the universe.
              </p>
              <a
                href="#"
                className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                Read our story
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
