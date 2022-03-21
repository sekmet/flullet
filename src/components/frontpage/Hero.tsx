import Link from 'next/link';

const Hero = () => (
  <header className="relative overflow-hidden">
    {/* Hero section */}
    <div className="mt-16 pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
        <div className="sm:max-w-lg">
          <h1 className="text-6xl font font-bold tracking-tight text-gray-900 sm:text-5xl">
            Welcome to Mintify.xyz
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            A peer-to-peer multi-chain marketplace for NFTs, rare digital items
            and crypto collectibles. Create, buy, sell, auction and discover new
            collectibles.
          </p>
        </div>
        <div>
          <div className="mt-10 xs:text-center">
            {/* Decorative image */}
            <div className="lg:absolute lg:top-y-0 lg:inset-y-0 lg:right-0">
              <img
                className="w-full h-full p-6"
                src="/assets/images/heading-fp1.png"
                alt="Welcome to Mintify.xyz"
              />
            </div>
            <Link href="/mint">
              <a
                id="mint-your-collection"
                className="inline-block text-center bg-blue-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-blue-700"
              >
                Create your NFT Collection
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Hero;
