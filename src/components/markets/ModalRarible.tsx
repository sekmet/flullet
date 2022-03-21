import { Fragment, useRef, useState, useEffect } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { EthEthereumAssetType } from '@rarible/api-client/build/models/AssetType';
import { createRaribleSdk } from '@rarible/sdk';
import { EthereumWallet } from '@rarible/sdk-wallet';
import { PrepareOrderRequest } from '@rarible/sdk/build/types/order/common';
import { toItemId } from '@rarible/types';
import { Web3Ethereum } from '@rarible/web3-ethereum';
import Web3 from 'web3';

import {
  getContractByChainId,
  getNetworkNameByChainId,
  ellipsisAddress,
} from '@/components/utils/network';

declare let window: any;

export default function ModalRarible({
  isOpen,
  setOpen,
  chainId,
  tokenId,
  tokenUri,
  contractAddress,
}) {
  const [provider, setProvider] = useState<any>();
  const [sdkEngine, setSdkEngine] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const [tokenid, setTokenId] = useState<any>();
  // const [chain_id, setChainId] = useState<any>();
  // const [network_name, setNetworkName] = useState<string | undefined>();
  const cancelButtonRef = useRef(null);
  // get network contracts
  const { nftaddress, nftmarketaddress } = getContractByChainId(
    String(chainId)
  );

  const NETWORK = getNetworkNameByChainId(String(chainId));
  const NFT_CONTRACT_ADDRESS = String(nftaddress).toLowerCase();

  const connect = async () => {
    if (!provider) {
      console.log('No provider found yet!');
    } else {
      // 1. Making metamask request
      await provider.request({ method: 'eth_requestAccounts' });
      // 2. Getting currently connected accounts
      const accounts = await provider.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        // First item is always currently used account
        setSigner(accounts[0]);
      }
      // Setting event listener on whenever user has changed account
      provider.on('accountsChanged', (accs: any) => {
        const [currentAccount] = accs;
        setSigner(currentAccount);
      });
    }
  };

  const wallet = () => {
    // 1. Check if provider and currentAccount is successfully set
    if (provider && signer) {
      return new EthereumWallet(
        new Web3Ethereum({ web3: new Web3(provider), from: signer })
      );
    }
    return undefined;
  };

  const sdk = (env: string) => {
    if (wallet()) {
      return createRaribleSdk(wallet(), env as any);
    }
    return undefined;
  };

  const sellTokenItem = async (event) => {
    event.preventDefault();
    // Example: simple fixed-price sale of an item owned by a user.
    console.log('Auctioning an item for a fixed price...', tokenId);
    if (!tokenId) {
      console.log('No Token ID provided');
      return false;
    }

    if (
      !(
        typeof sdk('staging') === 'object' &&
        sdk('staging')?.hasOwnProperty('order')
      )
    ) {
      console.log('No SDK found');
      await connect();
    }

    /* const { ethereum } = window as any
    const web3 = new Web3(provider)
    const web3Ethereum = new Web3Ethereum({ web3: web3, from: ownerAddress })
    const ethWallet = new EthereumWallet(web3Ethereum)
    const raribleSdk = createRaribleSdk(ethWallet, "staging") */

    // 1. set token url id
    const tokenMultichainAddress: string = `ETHEREUM:${NFT_CONTRACT_ADDRESS}:${tokenId}`;
    const ethCurrency: EthEthereumAssetType = {
      '@type': 'ETH',
    };
    const price: number = 1;
    const amount: number = 1;

    // 2. Create PreapreOrderRequest type object and pass it to sdk.order.sell
    const orderRequest: PrepareOrderRequest = {
      itemId: toItemId(tokenMultichainAddress),
    };

    // You can extract info about properties from orderResponse e.g.
    // 1. Base fee
    // 2. Max Amount
    // etc.
    const orderResponse = await sdk('staging')?.order?.sell(orderRequest);

    // 3. Submit the transaction -> it will pop up the metamask asking you to sign a transaction
    const response = await orderResponse?.submit({
      price,
      amount,
      currency: ethCurrency,
    });
    // We get order id from the response. It can be useful when we want to update sell order
    console.log(`Successfully created a fixed-price sell order! ${response}`);

    /* await axios
    .post(`/api/v1/rarible/sell`, data)
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
    const getProvider = () => {
      // 1. Getting ethereum object out of global JS object
      if ((window as any).ethereum) {
        const { ethereum } = window as any;

        return ethereum;
      }
      // 2. If ethereum property does not exist it means that user needs to install Metamask

      alert('Please install Metamask');
    };

    const _provider = getProvider();
    setProvider(_provider);

    const fetchData = async () => {
      // const { name, chainId } = await _provider.getNetwork()
      // setNetworkName(NETWORK);
      // setChainId(4);
      await connect();
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
                      Confirm your listing on Rarible
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm mb-3 text-red-500">
                        Review this information to ensure it's what you want to
                        list on Rarible.
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
                  onClick={(e) => sellTokenItem(e)}
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
