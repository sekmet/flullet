import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import type { NextApiRequest, NextApiResponse } from 'next';

import ApiTestnetDb from '@/lib/services/api_testnet_db';

const connectFluence = async () => {
  console.log('Connecting...');
  await Fluence.start({ connectTo: krasnodar[0] });
  if (Fluence.getStatus().isConnected && Fluence.getStatus().isInitialized) {
    console.log('Fluence is connected', Fluence.getStatus());
    // const mywallet = await ApiTestnetDb.getWalletByAddress({address: '"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a"'});
    // return mywallet
  }
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log('/v1/token/newitem === ', req.body);
  await connectFluence();

  const itemData = req.body;

  await ApiTestnetDb.updateMints({
    data_string: JSON.stringify({
      result: itemData,
      /* result: {
        network: signer?._network?.name,
        token_id: "9", 
        owner_address: signer?.provider?.provider?._state?.accounts[0], 
        chain_id: signer?._network?.chainId, 
        collection_id: random_id, 
        contract_address: address
        } */
    }),
  });

  res.status(200).send({
    result: 'ok',
    status: true,
    item: itemData,
  });

  return res;
}
