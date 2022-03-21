import { Fragment, useEffect, useState } from 'react';

import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';

import NetworkSwitcher from '@/components/layout/NetworkSwitcher';
import AccountModal from '@/components/wallet/AccountModal';
import ConnectButton from '@/components/wallet/ConnectButton';
import LoginUnsButton from '@/components/wallet/LoginUnsButton';
import theme from '@/components/wallet/theme';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ section, network, hasSubmenu }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chainid, setChainid] = useState<string | null>('0');
  const [owneraddress, setOwnerAddress] = useState<string | null>();

  const user = {
    name: 'NFTify',
    email: 'root@neftify.xyz',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  const navigation = [
    { name: 'EXPLORE MARKETS', href: '/collections', current: true },
    {
      name: 'MY COLLECTIONS',
      href: `/mycollections/${owneraddress}:${chainid}`,
      current: false,
    },
    /* {
      name: 'TRANSACTIONS',
      href: `/transactions/${owneraddress}:${chainid}`,
      current: false,
    }, */
  ];
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  useEffect(() => {
    // console.log('Ethereum Network Version ==> ', window.ethereum.networkVersion);
    console.log(section);
    console.log(network);
    const hasAccount = localStorage.getItem('account');
    const hasChainid = localStorage.getItem('chainid');
    setOwnerAddress(hasAccount);
    setChainid(hasChainid);
  }, [owneraddress]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {() => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <a id="logo">
                        <img
                          className="h-8 w-8"
                          src="/assets/images/logo.png"
                          alt="Mintify.xyz"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            id={item.name}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center space-x-4 md:ml-6">
                    <span>
                      <NetworkSwitcher chainId={chainid || false} />
                    </span>
                    <span>
                      <ChakraProvider theme={theme}>
                        <ConnectButton handleOpenModal={onOpen} />
                        <AccountModal isOpen={isOpen} onClose={onClose} />
                      </ChakraProvider>
                    </span>
                    <span>
                      <LoginUnsButton />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {hasSubmenu ? (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {network === 'ethereum' ? (
              <>
                <span className="mr-6 text-xl font-bold text-gray-600">
                  <Link href="/collections">
                    <a
                      id="collections"
                      className="text-gray-700 p-2 rounded hover:text-white hover:bg-blue-700"
                    >
                      <span>Collections</span>
                    </a>
                  </Link>
                </span>
                <span className="text-xl font-bold text-gray-900">
                  <Link href="/opensea">
                    <a
                      id="opensea"
                      className="text-gray-700 p-2 rounded hover:text-white hover:bg-blue-700"
                    >
                      <span>OpenSea</span>
                    </a>
                  </Link>
                </span>
                <span className="ml-6 text-xl font-bold text-gray-900">
                  <Link href="/rarible">
                    <a
                      id="rarible"
                      className="text-gray-700 p-2 rounded hover:text-white hover:bg-blue-700"
                    >
                      <span>Rarible</span>
                    </a>
                  </Link>
                </span>
                <span className="ml-6 text-xl font-bold text-gray-900">
                  <Link href="/superrare">
                    <a
                      id="superrare"
                      className="text-gray-700 p-2 rounded hover:text-white hover:bg-blue-700"
                    >
                      <span>SuperRare</span>
                    </a>
                  </Link>
                </span>
              </>
            ) : (
              <span className="mr-6 text-md font-bold text-gray-700">
                <Link href={`/mycollections/${owneraddress}:${chainid}`}>
                  <a className="text-gray-700 p-3 rounded hover:text-white hover:bg-blue-700">
                    Collections
                  </a>
                </Link>
                <Link href={`/mint/${owneraddress}:${chainid}`}>
                  <a className="text-gray-700 p-3 rounded hover:text-white hover:bg-blue-700">
                    Create
                  </a>
                </Link>
                <Link href={`/selling/${owneraddress}:${chainid}`}>
                  <a className="text-gray-700 p-3 rounded hover:text-white hover:bg-blue-700">
                    Selling
                  </a>
                </Link>
                <Link href={`/favorites/${owneraddress}:${chainid}`}>
                  <a className="text-gray-700 p-3 rounded hover:text-white hover:bg-blue-700">
                    Favorites
                  </a>
                </Link>
              </span>
            )}
          </div>
        </header>
      ) : (
        ''
      )}
    </>
  );
}
