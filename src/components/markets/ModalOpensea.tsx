import { Fragment, useRef, useState, useEffect } from 'react';

import {
  SignerSubprovider,
  RPCSubprovider,
  Web3ProviderEngine,
} from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

import {
  ellipsisAddress,
  getContractByChainId,
  getProviderByChainId,
  getNetworkNameByChainId,
  getRandomElement,
} from '@/components/utils/network';

declare let window: any;

const opensea = require('opensea-js');
const { WyvernSchemaName } = require('opensea-js/lib/types');

const { OpenSeaPort } = opensea;
const { Network } = opensea;

export default function ModalOpensea({
  isOpen,
  setOpen,
  chainId,
  tokenId,
  tokenUri,
  contractAddress,
}) {
  const [seaPort, setSeaPort] = useState<any | null>(null);
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  // const [tokenid, setTokenId] = useState<any>();
  const [chain_id, setChainId] = useState<any>();
  // const privateKeyWalletSubprovider = new PrivateKeyWalletSubprovider(MNEMONIC);
  const cancelButtonRef = useRef(null);

  // get network contracts
  const { nftaddress, nftmarketaddress } = getContractByChainId(
    String(chainId)
  );

  const NETWORK_PROVIDER = getRandomElement(
    getProviderByChainId(String(chainId))
  );
  const NETWORK = getNetworkNameByChainId(String(chainId));
  const NFT_CONTRACT_ADDRESS = String(nftaddress).toLowerCase();
  const API_KEY = process.env.API_KEY || ''; // API key is optional but useful if you're doing a high volume of requests.
  const price = String(1);

  const sellTokenItem = async (event, ownerAddress) => {
    event.preventDefault();
    // Example: simple fixed-price sale of an item owned by a user.
    console.log('Auctioning an item for a fixed price...', tokenId);
    if (!tokenId) {
      console.log('No Token ID provided');
      return false;
    }

    console.log('Wallet Address: ', ownerAddress);

    const fixedPriceSellOrder = await seaPort
      .createSellOrder({
        asset: {
          tokenId,
          tokenAddress: String(contractAddress).toLowerCase(),
          schemaName: WyvernSchemaName.ERC721,
          // schemaName: WyvernSchemaName.ERC1155
        },
        startAmount: price,
        endAmount: price,
        expirationTime: 0,
        accountAddress: ownerAddress,
      })
      .catch((err) => {
        console.log('ERROR => ', err);
        return false;
      });

    console.log(
      `Successfully created a fixed-price sell order! ${fixedPriceSellOrder?.asset?.openseaLink}`
    );

    /* await axios
    .post(`/api/v1/opensea/sell`, data)
    .then((response: any) => {
      // access the resp here....
      console.log('response', response)
      // var payload = response.statusText;
      // Alert('success', 'Congratulations...', 'Item minted with success...');
      //router.push(`/selling/${seller_address}:${chainid}`);
      return response;
    })
    .catch((error: any) => {
      console.log('error', error);
    }); */

    // close modal
    setOpen(false);
    return true;
  };

  useEffect(() => {
    // Create a Web3 Provider Engine
    const providerEngine = new Web3ProviderEngine();
    // const providerSigner = new ethers.providers.Web3Provider(window.ethereum, 'any');

    // Compose our Providers, order matters
    // Use the SignerSubprovider to wrap the browser extension wallet
    // All account based and signing requests will go through the SignerSubprovider
    providerEngine.addProvider(new SignerSubprovider(window.ethereum));
    // providerEngine.addProvider(privateKeyWalletSubprovider);

    // Use an RPC provider to route all other requests
    providerEngine.addProvider(new RPCSubprovider(NETWORK_PROVIDER));
    providerEngine.start();
    setProvider(providerEngine);

    const fetchData = async () => {
      // Get all of the accounts via Web3Wrapper
      const web3Wrapper = new Web3Wrapper(providerEngine);
      const accounts = await web3Wrapper.getAvailableAddressesAsync();
      // set the first account as the signer
      setSigner(accounts[0]);

      const seaport = new OpenSeaPort(
        providerEngine,
        {
          networkName: NETWORK === 'mainnet' ? Network.Main : Network.Rinkeby,
          networkCheckTimeout: 1000000,
          apiKey: API_KEY,
        },
        (arg) => {
          console.log('ARGS ==> ', arg);
        }
      );

      // set opensea connection
      setSeaPort(seaport);
      // stop engine
      providerEngine.stop();
    };
    fetchData();
  }, []);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 inline-flex"
                    >
                      <ExclamationIcon
                        className="mr-3 h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />{' '}
                      Confirm your listing on OpenSea
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm mb-3 text-red-500">
                        Review this information to ensure it's what you want to
                        list on OpenSea.
                      </p>
                      <div className="border-t text-sm border-gray-200">
                        <dl>
                          <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-700">
                              Name
                            </dt>
                            <dd className="mt-1 text-right text-sm align-middle text-gray-900 sm:mt-0 sm:col-span-2">
                              <img
                                className="inline-block h-6 w-6"
                                src={tokenUri}
                              />
                              <span className="ml-2 font-bold">
                                MintifyV01 NFT #40
                              </span>
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-700">
                              Contract Address
                            </dt>
                            <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <a href="#">{ellipsisAddress(contractAddress)}</a>
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-700">
                              Quantity
                            </dt>
                            <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="mr-1">1</span>
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-700">
                              Price
                            </dt>
                            <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              1 ETH
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => sellTokenItem(e, signer)}
                >
                  Confirm Order
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
