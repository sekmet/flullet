import { GetServerSideProps } from 'next';

import Explorer from '@/components/explorer/opensea';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { OpenSea } from '@/components/templates/Opensea';
import getCollections from '@/lib/cache/opensea';

const OpenseaPage = ({ assets }) => {
  return (
    <div className="min-h-full">
      <Header section="OpenSea" network="ethereum" hasSubmenu="true" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <OpenSea
            meta={
              <Meta title="OpenSea" description="OpenSea NFT Marketplace" />
            }
          >
            <Explorer assets={assets} />
          </OpenSea>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (/* context */) => {
  const newAssets = await getCollections();
  return {
    props: { assets: newAssets }, // will be passed to the page component as props
  };
};

export default OpenseaPage;
