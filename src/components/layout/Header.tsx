import { Fragment, useEffect } from 'react';

import {
	Alert,
	AlertIcon,
	ChakraProvider,
	Heading,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import AccountModal from '@/components/wallet/AccountModal';
import ConnectButton from '@/components/wallet/ConnectButton';
import LoginUnsButton from '@/components/wallet/LoginUnsButton';
import NetworkSwitcher from '@/components/layout/NetworkSwitcher';
import theme from '@/components/wallet/theme';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const user = {
  name: 'NFTify',
  email: 'root@neftify.xyz',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'EXPLORE MARKETS', href: '#', current: true },
  { name: 'MY COLLECTIONS', href: '#', current: false },
  { name: 'TRANSACTIONS', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({section, network}) {
const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
  console.log('Ethereum Network Version ==> ', window.ethereum.networkVersion);
}, [])
  return (
    <>
      {/*

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Mintify"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
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
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center space-x-4 md:ml-6">
                    <span><NetworkSwitcher /></span>
                    <span>
                      <ChakraProvider theme={theme}>
                          <ConnectButton handleOpenModal={onOpen} />
                          <AccountModal isOpen={isOpen} onClose={onClose} />
                      </ChakraProvider>
                    </span>
                    <span><LoginUnsButton /></span>
                    </div>
                  </div>

                </div>
              </div>

            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {network === 'ethereum' ?
            <>
            <span className="text-xl font-bold text-gray-900"><Link href="/opensea" className="p-2 rounded hover:text-white hover:bg-gray-500">OpenSea</Link></span>
            <span className="ml-6 text-xl font-bold text-gray-900"><Link href="/rarible" className="p-2 rounded hover:text-white hover:bg-gray-500">Rarible</Link></span>
            <span className="ml-6 text-xl font-bold text-gray-900"><Link href="/superrare" className="p-2 rounded hover:text-white hover:bg-gray-500">SuperRare</Link></span>
            </>
          : 
          <>
            <h1 className="text-xl font-bold text-gray-900">{`Other Network - ${network}`}</h1>
          </>
          }  
          </div>
        </header>
        </>
        )
}