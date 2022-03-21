import { GetServerSideProps } from 'next';

import Explorer from '@/components/explorer/superrare';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { Superrare } from '@/components/templates/Superrare';
import getFeatured from '@/lib/cache/superrare';

const SuperrarePage = ({ assets }) => {
  return (
    <div className="min-h-full">
      <Header section="Superrare" network="ethereum" hasSubmenu="true" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Superrare
            meta={
              <Meta title="Superrare" description="Superrare NFT Marketplace" />
            }
          >
            <Explorer assets={assets} />
          </Superrare>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (/* context */) => {
  const newAssets = await getFeatured();
  return {
    props: { assets: newAssets }, // will be passed to the page component as props
  };
};

export default SuperrarePage;
