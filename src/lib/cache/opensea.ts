import fs from 'fs';
import path from 'path';

import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';

import ApiOpenSea from '@/services/api_testnet_opensea';

async function fetchCollectionsData() {
  console.log('Fetching collections data...');

  await Fluence.start({ connectTo: krasnodar[0] });

  if (Fluence.getStatus().isConnected) {
    console.log('Fluence is connected', Fluence.getStatus());
  }

  const newAssets = await ApiOpenSea.getAllAssets({
    offset: 0,
    limit: 50,
    order: 'asc',
  });

  console.log('New Collection Assets ---> ', newAssets);

  return newAssets;
}

const COLLECTIONS_CACHE_PATH = path.resolve(
  process.cwd(),
  'cache/opensea.json'
);

export default async function getCollections() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(COLLECTIONS_CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('Collections cache not initialized');
  }

  if (!cachedData || !cachedData.length) {
    const data = await fetchCollectionsData();

    try {
      fs.writeFileSync(COLLECTIONS_CACHE_PATH, JSON.stringify(data), 'utf8');
      console.log('Wrote to collections cache');
    } catch (error) {
      console.log('ERROR WRITING COLLECTIONS CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
