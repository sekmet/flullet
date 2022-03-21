import fs from 'fs';
import path from 'path';

import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';

import ApiNftkeys from '@/services/api_nftkeys';

async function fetchCollectionData(alias: string | string[] | undefined) {
  console.log('Fetching collections data...');

  await Fluence.start({ connectTo: krasnodar[0] });

  if (Fluence.getStatus().isConnected) {
    console.log('Fluence is connected', Fluence.getStatus());
  }

  const newAssets = await ApiNftkeys.getCollectionTokens({
    alias,
  });
  console.log(`New Collection ${alias} Assets ---> `, newAssets);

  return newAssets;
}

export default async function getCollection(
  alias: string | string[] | undefined
) {
  let cachedData;

  const COLLECTION_CACHE_PATH = path.resolve(
    process.cwd(),
    `cache/${alias}.json`
  );

  try {
    cachedData = JSON.parse(fs.readFileSync(COLLECTION_CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('Collections cache not initialized');
  }

  if (!cachedData || !cachedData.length) {
    const data = await fetchCollectionData(alias);

    try {
      fs.writeFileSync(COLLECTION_CACHE_PATH, JSON.stringify(data), 'utf8');
      console.log('Wrote to collections cache');
    } catch (error) {
      console.log('ERROR WRITING COLLECTIONS CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
