import { useEffect, useState } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import { useEtherBalance, useEthers } from '@usedappify/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useRouter } from 'next/router';

import { getCurrencyByChainId } from '@/components/utils/network';

import Identicon from './Identicon';

declare let window: any;

// declare supportated chains
export const injected = new InjectedConnector({
  supportedChainIds: [
    1, 3, 4, 5, 42, 56, 69, 250, 1337, 80001, 43114, 1666600000, 1666700000,
    1313161554, 1313161555,
  ],
});

export default function ConnectButton({ handleOpenModal }: any) {
  const { activateBrowserWallet, account, active, activate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [chainId, setChainid] = useState<any>();
  const router = useRouter();

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  useEffect(() => {
    const hasAccount = localStorage.getItem('account');
    const hasChainid = localStorage.getItem('chainid');

    async function getAccount() {
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      // do something with new account here
      console.log('Account ==> ', account);
      const chainId = window.ethereum.networkVersion;
      localStorage.setItem('chainid', chainId);
      setChainid(chainId);
      localStorage.setItem('account', account);
    }

    /* window.ethereum.on('accountsChanged', function ([account]) {
      getAccount();
    }) */

    if (account && account !== 'undefined') {
      console.log('NO Account ==> ', account);
      const chainId = window.ethereum.networkVersion;
      localStorage.setItem('chainid', chainId);
      setChainid(chainId);
      localStorage.setItem('account', account);
    }

    if (hasAccount && hasAccount !== 'undefined') {
      // here we use activate to create the connection
      console.log('Account INJECTED ==> ', hasAccount);
      console.log('Chain ID INJECTED ==> ', hasChainid);
      console.log(router.pathname);
      console.log(router.asPath);
      console.log(router.query);
      // parse the pathname
      const _currentpage = router.asPath.split('/0x')[0];
      const _accountpath = router.asPath.split('/0x')[1];

      if (_accountpath) {
        const _accountaddr = `0x${_accountpath.split(':')[0]}`;
        const _chainid = parseInt(String(_accountpath.split(':')[1]));
        console.log(_accountaddr, _chainid);
        if (
          `${hasAccount}`.toLowerCase() === `${_accountaddr}`.toLowerCase() &&
          parseInt(String(hasChainid)) === _chainid
        ) {
          console.log('Acount and Chain ID MATCHED');
        } else {
          console.log('Acount and Chain ID NOT MATCHED');
          console.log(
            'Account URL ==> ',
            `${_currentpage}/${hasAccount}:${hasChainid}`
          );
          router.push(`${_currentpage}/${hasAccount}:${hasChainid}`);
          router.events.on('routeChangeComplete', () => router.reload());
        }
      }

      activate(injected);
    }
  }, [account]);

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)}{' '}
          {getCurrencyByChainId(chainId || 1)}
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'blue.400',
          backgroundColor: 'gray.700',
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>Connect Wallet</Button>
  );
}
