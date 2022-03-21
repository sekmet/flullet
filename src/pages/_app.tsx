import React from 'react';

import { DAppProvider } from '@usedappify/core';
import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/uns-buttons.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <DAppProvider config={{}}>
      <Component {...pageProps} />
    </DAppProvider>
  );
};

export default MyApp;
