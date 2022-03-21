import { Fragment, useState, useEffect } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

type IConnectedNetwork = {
  id: number;
  name: string;
  avatar: string;
};

const networks = [
  {
    id: 0,
    name: 'ALL Networks',
    avatar: '/assets/images/NEWCOIN.png',
  },
  {
    id: 43114,
    name: 'Avalanche Network',
    avatar: '/assets/images/avax.png',
  },
  {
    id: 43113,
    name: 'Avalanche Fuji Network',
    avatar: '/assets/images/avax.png',
  },
  {
    id: 1,
    name: 'Ethereum Network',
    avatar: '/assets/images/ethereum.jpg',
  },
  {
    id: 3,
    name: 'Ethereum Network [ROPSTEN]',
    avatar: '/assets/images/ethereum.jpg',
  },
  {
    id: 4,
    name: 'Ethereum Network [RINKEBY]',
    avatar: '/assets/images/ethereum.jpg',
  },
  {
    id: 5,
    name: 'Ethereum Network [GOERLI]',
    avatar: '/assets/images/ethereum.jpg',
  },
  {
    id: 42,
    name: 'Ethereum Network [KOVAN]',
    avatar: '/assets/images/ethereum.jpg',
  },
  {
    id: 25,
    name: 'Cronos Network',
    avatar: '/assets/images/cronos.png',
  },
  {
    id: 338,
    name: 'Cronos Network [TESTNET]',
    avatar: '/assets/images/cronos.png',
  },
  {
    id: 137,
    name: 'Polygon Network',
    avatar: '/assets/images/polygon.jpg',
  },
  {
    id: 80001,
    name: 'Polygon Network [MUMBAI]',
    avatar: '/assets/images/polygon.jpg',
  },
  {
    id: 250,
    name: 'Fantom Network',
    avatar: '/assets/images/fantom.png',
  },
  {
    id: 4002,
    name: 'Fantom Network [TESTNET]',
    avatar: '/assets/images/fantom.png',
  },
  {
    id: 1666600000,
    name: 'Harmony Network',
    avatar: '/assets/images/harmony.jpg',
  },
  {
    id: 1666700000,
    name: 'Harmony Network [TESTNET]',
    avatar: '/assets/images/harmony.jpg',
  },
  {
    id: 1313161554,
    name: 'Aurora Network',
    avatar: '/assets/images/aurora.jpg',
  },
  {
    id: 1313161555,
    name: 'Aurora Network [TESTNET]',
    avatar: '/assets/images/aurora.jpg',
  },
  /* {
    id: 490099,
    name: 'Solana Network',
    avatar: '/assets/images/NEWCOIN.png',
  },
  {
    id: 560099,
    name: 'Near Network',
    avatar: '/assets/images/NEWCOIN.png',
  },
  {
    id: 56,
    name: 'Binance Chain',
    avatar: '/assets/images/binance.jpg',
  }, */
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NetworkSwitcher({ chainId }) {
  const [selected, setSelected] = useState<
    undefined | IConnectedNetwork | IConnectedNetwork[]
  >(networks.filter((x) => String(x.id) === chainId));

  useEffect(() => {
    if (chainId) {
      const network = networks.filter((x) => String(x.id) === chainId);
      setSelected(network[0] as IConnectedNetwork);
    }
  }, [chainId]);

  return (
    <Listbox value={selected as IConnectedNetwork} onChange={setSelected}>
      {({ open }) => {
        const { avatar, name } = selected as IConnectedNetwork;
        return (
          <>
            <div className="relative">
              <Listbox.Button className="relative w-full bg-gray-900 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={avatar}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <span className="ml-3 block truncate">
                    <strong className="text-white">{name}</strong>
                  </span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {networks.map((network) => (
                    <Listbox.Option
                      key={network.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-gray-900' : 'text-white',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={network}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img
                              src={network.avatar}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {network.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        );
      }}
    </Listbox>
  );
}
