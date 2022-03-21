// import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
// import { InfuraConnector } from "@/lib/blockchain/connectors"
import { useRouter } from 'next/router';
import randomId from 'random-id';

import erc721abi from '@/lib/blockchain/abis/erc721.json';

declare let window: any;

type IItemData = {
  network: string | undefined;
  token_id: string | undefined;
  owner_address: string | undefined;
  chain_id: string | undefined;
  collection_id: string | undefined;
  contract_address: string | undefined;
};

// a submit function that will execute upon form submission
const submitItem = async (
  data: IItemData,
  router: any,
  owner_address: string | undefined,
  chainid: string | undefined
) => {
  await axios
    .post(`/api/v1/token/newitem`, data)
    .then((response: any) => {
      // access the resp here....
      // var payload = response.statusText;
      // Alert('success', 'Congratulations...', 'Item minted with success...');
      router.push(`/mycollections/${owner_address}:${chainid}`);
      return response;
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
export default function MinterEthereum({
  tokenURI,
  setId,
  chainid,
  contractAddress,
}) {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [tokenid, setTokenId] = useState<any>();
  const [chain_id, setChainId] = useState<any>();
  const [network_name, setNetworkName] = useState<string | undefined>();
  const [owner_address, setOwner] = useState<any>();
  const [minting, setMinting] = useState<undefined | boolean>();
  const abi = new Interface(erc721abi);
  // This can be an address or an ENS name
  const address = contractAddress || process.env.NFT721_CONTRACT_ADDRESS; // "0xA03dc0FAa9e3b76f92D5d340c62F9969e221bdbC";
  const pattern = 'aA0';
  const random_id = randomId(6, pattern);
  const router = useRouter();

  // Read-Only; By connecting to a Provider, allows:
  // - Any constant function
  // - Querying Filters
  // - Populating Unsigned Transactions for non-constant methods
  // - Estimating Gas for non-constant (as an anonymous sender)
  // - Static Calling non-constant methods (as anonymous sender)
  let erc721: any = {};
  if (address && abi && provider) {
    erc721 = new Contract(address, abi, provider);
    erc721.currentTokenId().then(function (result) {
      // console.log('Token ID ===> ', result, chainid);
      if (result) {
        const _result = BigNumber.from(result).toNumber() + 1;
        // console.log('Token ID dec ===> ', _result);
        setTokenId(_result);
        setId(_result);
      }
    });
  }

  const mintNFT = async (
    tokenAddress,
    tokenURI,
    tokenName,
    tokenDescription
  ) => {
    let requestAccounts;
    let userAddress;
    if (typeof provider !== 'undefined' && typeof signer !== 'undefined') {
      requestAccounts = await provider.send('eth_requestAccounts', []);
      userAddress = await signer.getAddress();
      console.log(`Your wallet is ${userAddress}`);
    }
    // Read-Write; By connecting to a Signer, allows:
    // - Everything from Read-Only (except as Signer, not anonymous)
    // - Sending transactions for non-constant functions
    const erc721rw = new Contract(tokenAddress, abi, signer);
    erc721rw.createToken(tokenURI).then(async function (tx) {
      setMinting(true);
      console.log('Chain ID: ', chainid);
      console.log('Transaction: ', tx);
      console.log('Wait for the transaction to be mined...');
      await tx.wait();
      console.log('Transaction mined!', signer);
      // Get the token ID
      /* const tokenId = await erc721rw.tokenOfOwnerByIndex(userAddress, 0);
              console.log("Token ID: ", tokenId);
              // Get the token URI
              const tokenURI = await erc721.tokenURI(tokenId);
              console.log("Token URI: ", tokenURI);
              // Get the token name
              const tokenName = await erc721.name(tokenId);
              console.log("Token Name: ", tokenName);
              // Get the token description
              const tokenDescription = await erc721.tokenURI(tokenId);
              console.log("Token Description: ", tokenDescription);
              // Get the token owner
              const tokenOwner = await erc721.ownerOf(tokenId);
              console.log("Token Owner: ", tokenOwner); */
      // Get the token balance
      const tokenBalance = await erc721.balanceOf(userAddress);
      console.log('Token Balance: ', tokenBalance);

      const itemData: IItemData = {
        network: network_name,
        token_id: tokenid,
        owner_address: `${owner_address}`.toLowerCase(),
        chain_id,
        collection_id: random_id,
        contract_address: address,
      };

      console.log('Item Data: ', itemData);
      await submitItem(itemData, router, owner_address, chain_id);
    });

    console.log(tokenName, tokenDescription);
    setMinting(false);
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
  }, [minting]);

  // provider && erc721.tokenURI(1).then(function(result){
  //    console.log('tokenURI ===> ',result);
  // }).
  // catch(function(error){
  //    console.log(error);
  // });

  return (
    <div>
      {minting ? (
        <div
          id="loading-screen"
          className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50"
        >
          <span className="text-blue-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
            <div className="text-center">
              <svg
                role="status"
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      {tokenURI && (
        <div className="mt-6 ml-3 mr-3">
          <button
            type="button"
            className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={async () =>
              mintNFT(address, tokenURI, 'MintifyV1', 'My mintify v1.0 nft')
            }
          >
            {' '}
            MINT{' '}
          </button>
        </div>
      )}
    </div>
  );
}

/* export const getServerSideProps: GetServerSideProps = (context) => {

  return connectFluence().then((result) => {   

  return {
    props: { isconnected: Fluence.getStatus().isInitialized }, // will be passed to the page component as props
  }

  }).catch((error) => {
    console.error(error);
  })

} */
