import { useState } from 'react';

import { GetServerSideProps } from 'next';

import Collection from '@/components/collection';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { CollectionTmpl } from '@/components/templates/Collection';
import getCollection from '@/lib/cache/collection';

const CollectionPage = ({ alias, assets }) => {
  // const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-full">
      <Header section={alias} network="ethereum" hasSubmenu={true} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <CollectionTmpl
            meta={
              <Meta title={alias} description={`${alias} NFT Marketplace`} />
            }
          >
            <Collection alias={alias} assets={assets} />
          </CollectionTmpl>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const alias = context.params?.alias;

  const newAssets = await getCollection(alias);

  return {
    props: { alias, assets: newAssets }, // will be passed to the page component as props
  };
};

export default CollectionPage;
