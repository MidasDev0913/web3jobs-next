import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useRouter } from 'next/router';
import { Web3ReactProvider as Web3Provider } from '@web3-react/core';
import { UseWalletProvider as WalletProvider } from 'use-wallet';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

import { walletConnect, chainId } from '../utils/constants';
import { store } from '../redux/store';
import { customizedTheme } from './theme';
import { getLibrary } from '../utils/helper';
import MainLayout from '../components/MainLayout';
import PersonalDashboardLayout from '../components/PersonalDashboardLayout'

interface Route {
  [key: string]: boolean
}


const routes: Route = {
  '/:company': true,
  '/': true,
  '/salaries': true,
  '/learn': true,
  '/sponsorship': true,
  '/post-job': true,
  '/job': true,
  '/dashboard': false,
  '/manage-jobs': false,
  '/detail-job/:id': false,
  '/edit-job/:id': false,
  '/history': false,
  '/invoices': false
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = createTheme(customizedTheme);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/history/increaseVisitors`);
  }, []);

  if (process.env.REACT_APP_ENV === 'prod') {
    console.log = () => { }
  }

  const path = router.pathname;
  const isMainLayout = routes[path];

  console.log("path changed", router);
  return (
    <WalletProvider connectors={walletConnect}>
      <Web3Provider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          {/*
          @ts-ignore */}
          <SnackbarProvider maxSnack={3}>
            <Provider store={store}>
              {isMainLayout &&
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout> 
              }
              {!isMainLayout &&
                <PersonalDashboardLayout>
                  <Component {...pageProps} />
                </PersonalDashboardLayout>
              }

            </Provider>
          </SnackbarProvider>
        </ThemeProvider>
      </Web3Provider>
    </WalletProvider>
  )
}

export default MyApp
