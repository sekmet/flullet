import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { GetServerSideProps } from 'next';

import HeaderCollection from '@/components/layout/HeaderCollection';
import { Meta } from '@/components/layout/Meta';
import Explorer from '@/components/selling';
import { Mycollection } from '@/components/templates/MyCollection';
import { getContractByChainId } from '@/components/utils/network';
import ApiTestnetDb from '@/lib/services/api_testnet_db';

const MySellingPage = ({
  isconnected,
  assets,
  owner_address,
  contract_address,
  market_address,
  chain_id,
}) => {
  console.log(isconnected);
  return (
    <div className="min-h-full">
      <HeaderCollection section="My Collections" network="ethereum" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Mycollection
            meta={<Meta title="Mintify" description="My NFT Marketplace" />}
          >
            <Explorer
              alias="mintify"
              assets={assets}
              ownerAddress={owner_address}
              contractAddress={contract_address}
              marketAddress={market_address}
              chain_id={chain_id}
            />
          </Mycollection>
        </div>
      </main>
    </div>
  );
};

const connectFluence = async (owner_address, chain_id) => {
  console.log('Connecting...');
  await Fluence.start({ connectTo: krasnodar[0] });

  if (Fluence.getStatus().isConnected && Fluence.getStatus().isInitialized) {
    console.log('Fluence is connected', Fluence.getStatus());

    let mywallet: any = await ApiTestnetDb.getWalletByAddress({
      address: `"${owner_address}"`,
    });

    console.log('my wallet ---> ', mywallet);

    if (mywallet && mywallet?.address === 'x') {
      await ApiTestnetDb.updateWallets({
        data_string: JSON.stringify({
          result: {
            address: owner_address,
            network: 'ethereum',
            chain_id: '5',
          },
        }),
      });
      mywallet = await ApiTestnetDb.getWalletByAddress({
        address: `"${owner_address}"`,
      });
      console.log('new wallet created ---> ', mywallet);
    }

    const allSales = await ApiTestnetDb.getAllSales();
    console.log('all sales ---> ', allSales);

    const sales = await ApiTestnetDb.getSalesBySellerAndChainId({
      seller_address: `"${owner_address}"`,
      chain_id: `"${chain_id}"`,
    });
    // await ApiTestnetDb.getAllMints()
    const result = { sales, mywallet };
    return result;
  }
};

export const getServerSideProps: GetServerSideProps | any = (context) => {
  const owner_wallet = `${context.params.address}`.toLowerCase();
  const owner_address = `${owner_wallet}`.split(':')[0];
  const chain_id = `${owner_wallet}`.split(':')[1];

  return connectFluence(owner_address, chain_id)
    .then((result) => {
      console.log(
        'getContractByChainId ---> ',
        chain_id,
        getContractByChainId(String(chain_id))
      );
      const { nftaddress, nftmarketaddress } = getContractByChainId(
        String(chain_id)
      );

      return {
        props: {
          assets: result?.sales,
          owner_address,
          chain_id,
          contract_address: nftaddress,
          market_address: nftmarketaddress,
          isconnected: Fluence.getStatus().isInitialized,
        }, // will be passed to the page component as props
      };
    })
    .catch((error) => {
      console.error(error);
    });
};

export default MySellingPage;
