import { useState } from 'react';

import { GetServerSideProps } from 'next';

import Explorer from '@/components/explorer/collection';
import Header from '@/components/layout/Header';
import { Meta } from '@/components/layout/Meta';
import { Nftkeys } from '@/components/templates/Nftkeys';
import getCollections from '@/lib/cache/collections';

const NftkeysPage = ({ assets }) => {
  // const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [offset, setOffset] = useState(0);

  /* const loadAssets = async () => {
    try {
      setLoading(true);
      await Fluence.start({ connectTo: krasnodar[0] });
      
      if (Fluence.getStatus().isConnected) {
      console.log('Fluence is connected', Fluence.getStatus());
      }

      const newAssets = await ApiNftkeys.getAllCollections();
      console.log('newAssets ---> ', newAssets);

      //if (newAssets.result.length > 0 && newAssets.status === 'SUCCESS') {
      setAssets([...assets, ...newAssets]);
      //setOffset(offset + 32);
      setLoading(false);
      
      //}

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    
    
  };
  
  useEffect(() => {
    const load = async () => {
      await loadAssets();
    };
    load();
    
  }, []); */

  return (
    <div className="min-h-full">
      <Header section="Nftkeys" network="ethereum" hasSubmenu="true" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Nftkeys
            meta={
              <Meta title="Nftkeys" description="Nftkeys NFT Marketplace" />
            }
          >
            <Explorer assets={assets} />
          </Nftkeys>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (/* context */) => {
  // const params = context.params;
  const newAssets = await getCollections();

  return {
    props: { assets: newAssets }, // will be passed to the page component as props
  };
};

export default NftkeysPage;
