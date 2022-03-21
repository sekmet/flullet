import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import { useRouter } from 'next/router';
import randomId from 'random-id';

import marketplaceAbi from '@/lib/blockchain/abis/ethereum/marketplace.json';

declare let window: any;

type ISellItem = {
  tokenId: string | undefined;
  chainId: string | undefined;
  contractAddress: string | undefined;
  marketAddress: string | undefined;
  price: string | undefined;
};

type IMarketItem = {
  saleId: string | undefined;
  itemId: string | undefined;
  ownerAddress: string | undefined;
  sellerAddress: string | undefined;
  contractAddress: string | undefined;
  marketAddress: string | undefined;
  network: string | undefined;
  chainId: string | undefined;
  tokenId: string | undefined;
  price: string | undefined;
  priceCurrency: string | undefined;
  sold: string | undefined;
};

// a submit function that will execute upon form submission
const submitItem = async (
  data: IMarketItem,
  router: any,
  seller_address: string | undefined,
  chainid: string | undefined
) => {
  await axios
    .post(`/api/v1/token/marketitem`, data)
    .then((response: any) => {
      // access the resp here....
      // var payload = response.statusText;
      // Alert('success', 'Congratulations...', 'Item minted with success...');
      router.push(`/selling/${seller_address}:${chainid}`);
      return response;
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};

export default function MarketplaceEthereum(itemSell: ISellItem) {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [tokenid, setTokenId] = useState<any>();
  const [chainid, setChainId] = useState<any>();
  const [sellingItem, setSellingItem] = useState<any>();
  const [networkname, setNetworkName] = useState<string | undefined>();
  const [owneraddress, setOwner] = useState<any>();

  const abi = new Interface(marketplaceAbi);
  // This can be an address or an ENS name
  // const market_address = marketAddress || process.env.NFT_MARKET_CONTRACT_ADDRESS;
  // const address = contractAddress || process.env.NFT721_CONTRACT_ADDRESS;
  const pattern = 'aA0';
  const random_id = randomId(6, pattern);
  const router = useRouter();

  const submitSaleItem = async (
    marketData: IMarketItem,
    router: any,
    owneraddress: string | undefined,
    chainid: string | undefined
  ) => {
    const result = await submitItem(marketData, router, owneraddress, chainid);
    return result;
  };

  const createMarketItem = async (itemSell: ISellItem) => {
    const { tokenId, chainId, contractAddress, marketAddress, price } =
      itemSell;

    console.log(tokenId, chainId, contractAddress, marketAddress, price);

    const marketplace = new Contract(String(marketAddress), abi, signer);

    marketplace.on(
      'MarketItemCreated',
      (itemId, nftContract, tokenId, seller, owner, price, sold) => {
        console.log(
          'MarketItemCreated ===> ',
          itemId,
          nftContract,
          tokenId,
          seller,
          owner,
          price,
          sold
        );

        const marketData: IMarketItem = {
          saleId: random_id,
          itemId: BigNumber.from(itemId).toString(),
          tokenId: BigNumber.from(tokenId).toString(),
          sellerAddress: `${seller}`.toLowerCase(),
          ownerAddress: `${owner}`.toLowerCase(),
          marketAddress,
          contractAddress: nftContract,
          network: networkname,
          chainId: String(chainid),
          price: BigNumber.from(price).toString(),
          priceCurrency: 'ETH',
          sold: String(sold),
        };

        console.log(
          'Selling Item Data: ',
          contractAddress,
          tokenId,
          BigNumber.from(price).toString()
        );
        submitSaleItem(marketData, router, owneraddress, chainid);
        setSellingItem(false);
      }
    );

    marketplace
      .createMarketItem(contractAddress, tokenId, price)
      .then(async function (tx) {
        setSellingItem(true);
        console.log('Transaction: ', tx);
        console.log('Wait for the transaction to be mined...');
        await tx.wait();
        console.log('Transaction mined!', signer);
        // Get the token balance
        // const tokenBalance = await erc721.balanceOf(userAddress);
        // console.log('Token Balance: ', tokenBalance);
      });
  };

  useEffect(() => {
    // Connect to the Ethereum network
    const _provider = new Web3Provider(window.ethereum, 'any');
    setProvider(_provider);
    (async function () {
      await _provider.send('eth_requestAccounts', []);
      const _signer = _provider.getSigner();
      setSigner(_signer);
      const userAddress = await _signer.getAddress();
      console.log(`Your wallet is ${userAddress}`);
      setOwner(userAddress);
      const { name, chainId } = await _provider.getNetwork();
      setNetworkName(name);
      setChainId(chainId);
    })();
  }, []);

  return (
    <div className="w-full">
      {sellingItem ? (
        <div
          id="loading-screen"
          className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50"
        >
          <span className="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
            <div className="text-center">
              <svg
                role="status"
                className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </span>
        </div>
      ) : (
        ''
      )}

      <button
        type="button"
        className="w-full mb-1 text-gray-600 bg-gray-400 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={async () => createMarketItem(itemSell)}
      >
        Sell Item
      </button>
    </div>
  );
}
