import fs from 'fs';
import path from 'path';

import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';

import ApiSuperrare from '@/services/api_superrare';

const FEATURED_CACHE_PATH = path.resolve(
  process.cwd(),
  'cache/superrare-featured.json'
);

async function fetchFeaturedData() {
  console.log('Fetching featured data...');

  await Fluence.start({ connectTo: krasnodar[0] });

  if (Fluence.getStatus().isConnected) {
    console.log('Fluence is connected', Fluence.getStatus());
  }

  const newAssets = await ApiSuperrare.featuredArtworks({
    contract1: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
    contract2: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
  });

  return newAssets;
}

export default async function getFeatured() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(FEATURED_CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('Featured cache not initialized');
  }

  if (!cachedData || !cachedData.length) {
    console.log('Collections not cached!!!', cachedData.length, cachedData);
    const data = await fetchFeaturedData();

    try {
      fs.writeFileSync(FEATURED_CACHE_PATH, JSON.stringify(data), 'utf8');
      console.log('Wrote to featured cache');
    } catch (error) {
      console.log('ERROR WRITING FEATURED CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
