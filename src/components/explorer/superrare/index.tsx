import { useEffect, useState, ReactNode } from 'react';
import { Fluence, FluencePeer, setLogLevel } from '@fluencelabs/fluence';
import { krasnodar, Node } from '@fluencelabs/fluence-network-environment';
import ApiSuperrare from '@/services/api_superrare';
import Link from 'next/link';
import Item from './item';

export default function Explorer() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [offset, setOffset] = useState(0);

  const loadAssets = async () => {
    try {
      setLoading(true);
      await Fluence.start({ connectTo: krasnodar[0] });
      
      if (Fluence.getStatus().isConnected) {
      console.log('Fluence is connected', Fluence.getStatus());
      }

      const newAssets = await ApiSuperrare.featuredArtworks({
        contract1: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
        contract2: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
      });
      
      if (newAssets.result.length > 0 && newAssets.status === 'SUCCESS') {
      setAssets([...assets, ...newAssets.result]);
      //setOffset(offset + 32);
      setLoading(false);
      console.log('newAssets ---> ', newAssets);
      }
    

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
    
  }, []);

  return (
    <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {assets.map((asset) => (
              <Item key={asset.tokenId} asset={asset} />
          ))}
        </div>

      {!loading && assets.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => loadAssets()}
            className="bg-white w-full hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-500 rounded"
          >
            Load More
          </button>
        </div>
      )}        
    </div>
  )
}