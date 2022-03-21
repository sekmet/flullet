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
    // console.log('mywallet ---> ', mywallet);
    // return mywallet
  }
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log('/v1/token/marketitem === ', req.body);
  await connectFluence();

  const {
    saleId,
    itemId,
    tokenId,
    sellerAddress,
    ownerAddress,
    marketAddress,
    contractAddress,
    network,
    chainId,
    price,
    priceCurrency,
    sold,
  } = req.body;

  await ApiTestnetDb.updateSales({
    data_string: JSON.stringify({
      result: {
        sale_id: saleId,
        item_id: itemId,
        token_id: tokenId,
        seller_address: sellerAddress,
        owner_address: ownerAddress,
        market_address: marketAddress,
        contract_address: contractAddress,
        network,
        chain_id: chainId,
        price,
        price_currency: priceCurrency,
        sold,
      },
    }),
  });

  res.status(200).send({
    result: 'ok',
    status_code: 200,
    status: true,
    message: 'Market item updated',
  });

  return res;
}
