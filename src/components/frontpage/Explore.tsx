import { BigNumber } from '@ethersproject/bignumber';
import Link from 'next/link';

import SellingItem from '@/components/frontpage/ExploreItem';
import { getContractByChainId } from '@/components/utils/network';

const favorites = [
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
  {
    id: 4,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 5,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 6,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
  {
    id: 4,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 5,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 6,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },

  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
  {
    id: 4,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 5,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 6,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];

const ExploreSelling = ({ provider, chainId, onSaleItems }) => {
  // get network contracts
  const { nftaddress, nftmarketaddress } = getContractByChainId(
    String(chainId)
  );
  console.log(provider);

  return (
    <section aria-labelledby="favorites-heading">
      <div className="max-w-7xl mx-auto py-6 px-2 sm:py-8 sm:px-3 lg:px-4">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Explore
          </h2>
          <Link href="/collections">
            <a
              id="all-collections"
              className="hidden text-sm font-bold text-blue-600 hover:text-blue-500 sm:block"
            >
              Browse all collections<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-6 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
          {onSaleItems.map((onsale) => (
            <SellingItem
              key={`${BigNumber.from(
                onsale.itemId
              ).toString()}-${BigNumber.from(onsale.tokenId).toString()}`}
              contractAddress={nftaddress}
              marketAddress={nftmarketaddress}
              asset={onsale}
            />
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/collections">
            <a
              id="all-collections-b"
              className="block text-sm font-bold text-blue-600 hover:text-blue-500"
            >
              Browse all collections<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreSelling;
