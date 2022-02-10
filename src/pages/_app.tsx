import React, { useEffect } from "react";
//import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
//import Web3 from "web3";
import { DAppProvider } from '@usedappify/core';
import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/uns-buttons.css';

const getLibrary = (provider) => {
  return new Web3(provider);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
return (
    <DAppProvider config={{}}>
        <Component {...pageProps} />  
    </DAppProvider>    
);
}

/*const getLibrary = (provider) => {
  return new Web3(provider);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
const web3React = useWeb3React();
return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
    </Web3ReactProvider>    
);
}
*/

export default MyApp;
