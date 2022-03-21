import { useEffect, useState } from 'react';

import {
  SignerSubprovider,
  RPCSubprovider,
  Web3ProviderEngine,
} from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { Interface } from '@ethersproject/abi';
import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { Meta } from '@/components/layout/Meta';
import Explorer from '@/components/mycollection';
import { Mycollection } from '@/components/templates/MyCollection';
import { getContractByChainId } from '@/components/utils/network';
import marketplaceAbi from '@/lib/blockchain/abis/ethereum/marketplace.json';
import ApiTestnetDb from '@/lib/services/api_testnet_db';

// import { Web3Provider } from '@ethersproject/providers';
// import HDWalletProvider from '@truffle/hdwallet-provider';

declare let window: any;

const HeaderCollection = dynamic(
  () => import('@/components/layout/HeaderCollection')
);

const MyCollectionPage = ({
  isconnected,
  assets,
  owner_address,
  contract_address,
  market_address,
  chain_id,
}) => {
  // const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [offset, setOffset] = useState(0);
  // const [provider, setProvider] = useState<any>();
  const [providerEngine, setProviderEngine] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [tokenid, setTokenId] = useState<any>();
  // const [chain_id, setChainId] = useState<any>();
  // const [isOpen, setOpen] = useState(false);
  const [network_name, setNetworkName] = useState<string | undefined>();

  const abi = new Interface(marketplaceAbi);

  useEffect(() => {
    async function fetchData() {
      // Get all of the accounts via Web3Wrapper
      // const web3Wrapper = new Web3Wrapper(providerEngine);
      // const accounts = await web3Wrapper.getAvailableAddressesAsync();
      // console.log(accounts);
      /// const _provider = new Web3Provider(window.ethereum, 'any');
      // Create a Web3 Provider Engine
      const providerEngine = new Web3ProviderEngine();
      // const privateKeyWalletSubprovider = new PrivateKeyWalletSubprovider(MNEMONIC);
      // Compose our Providers, order matters
      // Use the SignerSubprovider to wrap the browser extension wallet
      // All account based and signing requests will go through the SignerSubprovider
      providerEngine.addProvider(new SignerSubprovider(window.ethereum));
      // providerEngine.addProvider(privateKeyWalletSubprovider);
      // Use an RPC provider to route all other requests
      providerEngine.addProvider(
        new RPCSubprovider(
          'https://eth-rinkeby.alchemyapi.io/v2/0CZZlrwfBDMfyK2Ao5roxdkEAlJ1c0xY'
        )
      );
      providerEngine.start();

      setProviderEngine(providerEngine);
      // setTokenId(tokenId);

      const web3Wrapper = new Web3Wrapper(providerEngine);
      const accounts = await web3Wrapper.getAvailableAddressesAsync();
      console.log(accounts);
      setSigner(accounts[0]);

      const userAddress = accounts[0];
      console.log(`Your wallet is ${userAddress}`);
      setOwner(userAddress);
      // console.log(`Your token ID is ${tokenId}`);

      // const chainId = await web3Wrapper.getChainIdAsync();
      // const name = await web3Wrapper.getNetworkIdAsync();
      // setNetworkName(name);
      // setChainId(chainId);
      providerEngine.stop();
    }
    fetchData();
  }, []);

  console.log(providerEngine, isconnected);

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
    // await ApiTestnetDb.ownerNuclearDrop()
    // await ApiTestnetDb.initService()
    // return;
    // await ApiTestnetDb.updateWallets( {data_string: JSON.stringify( { result: { address: "0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a", "network": "ethereum", "chain_id": "5"}} )} )

    /* await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "1", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a0", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "2", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a1", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "3", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a2", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "4", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a3", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "5", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a4", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "6", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a5", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "7", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a6", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    await ApiTestnetDb.updateMints({ data_string: JSON.stringify({ result: {network:"ethereum", token_id: "8", owner_address:"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a",  chain_id: "5", collection_id: "a7", contract_address:"0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC"}}) } );
    */

    /* const newSale = {
      saleId: "B0s4gK",
      itemId: "14",
      tokenId: "36",
      sellerAddress: "0x7ef99b0e5beb8ae42dbf126b40b87410a440a32a",
      ownerAddress: "0x0000000000000000000000000000000000000000",
      marketAddress: "0xcd31e081E8879d2E8939300244c12E015e8163A4",
      contractAddress: "0xed97A8D1F4889a732C3942A04474EA1d990c6359",
      network: "rinkeby",
      chainId: "4",
      price: "1",
      priceCurrency: "ETH",
      sold: "false"
    }; */

    /* let sale = await ApiTestnetDb.updateSales({ data_string: JSON.stringify({ result: {
      sale_id: "B0s4gK",
      item_id: "14",
      token_id: "36",
      seller_address: "0x7ef99b0e5beb8ae42dbf126b40b87410a440a32a",
      owner_address: "0x0000000000000000000000000000000000000000",
      market_address: "0xcd31e081E8879d2E8939300244c12E015e8163A4",
      contract_address: "0xed97A8D1F4889a732C3942A04474EA1d990c6359",
      network: "rinkeby",
      chain_id: "4",
      price: "1",
      price_currency: "ETH",
      sold: "false"
    } }) });
    console.log('sale -----> ', sale); */

    // const mints = await ApiTestnetDb.getMintsByOwner({owner_address: '"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a"'});

    // const wallets = await ApiTestnetDb.getAllWallets()
    // console.log('my wallets ---> ', wallets);

    // const mywallet = await ApiTestnetDb.getWalletByAddress({address: '"0x7EF99B0E5bEb8ae42DbF126B40b87410a440a32a"'});
    // console.log('my wallet ---> ', mywallet);
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

    const mints = await ApiTestnetDb.getMintsByOwnerAndChainId({
      owner_address: `"${owner_address}"`,
      chain_id: `${chain_id}`,
    });
    // await ApiTestnetDb.getAllMints()
    const result = { mints, mywallet };
    return result;
  }
};

export const getServerSideProps: GetServerSideProps | any = (context) => {
  // console.log('getServerSideProps ---> ', context.params);
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
      // (async () => await ApiTestnetDb.ownerNuclearDrop())();
      // (async () => await ApiTestnetDb.initService())();
      // (async () => await ApiTestnetDb.updateWallets( {data_string: '{"result": {}}'} ))();
      // (async () => await ApiTestnetDb.getAllWallets())();

      return {
        props: {
          assets: result?.mints,
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

export default MyCollectionPage;
