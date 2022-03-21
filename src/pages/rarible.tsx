import { GetServerSideProps } from 'next';

import Explorer from '@/components/explorer/rarible';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { Rarible } from '@/components/templates/Rarible';
import getCollections from '@/lib/cache/rarible';

const RariblePage = ({ assets }) => {
  return (
    <div className="min-h-full">
      <Header section="Rarible" network="ethereum" hasSubmenu="true" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Rarible
            meta={
              <Meta title="Rarible" description="Rarible NFT Marketplace" />
            }
          >
            <Explorer assets={assets} />
          </Rarible>
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

export default RariblePage;
