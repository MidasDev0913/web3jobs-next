import '../styles/globals.scss';
import type { AppProps, AppContext } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

import { store } from '../redux/store';
import { customizedTheme } from './theme';
import { getLibrary } from '../utils/helper';
import MainLayout from '../components/MainLayout';
import PersonalDashboardLayout from '../components/PersonalDashboardLayout';
import LoadScript from '../components/LoadScript';
import { WagmiConfig } from 'wagmi';
import { client } from '../provider/wagmi';

interface Route {
  [key: string]: boolean;
}

const routes: Route = {
  '/companies': true,
  '/companies/[company]': true,
  '/salaries': true,
  '/learn': true,
  '/sponsorship': true,
  '/post-job': true,
  '/job': true,
  '/job/[desc]': true,
  '/dashboard': false,
  '/manage-jobs': false,
  '/detail-job/:id': false,
  '/edit-job/:id': false,
  '/history': false,
  '/invoices': false,
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = createTheme(customizedTheme);

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/history/increaseVisitors`);
  }, []);

  if (process.env.NEXT_PUBLIC_ENV === 'prod') {
    console.log = () => {};
  }

  const path = router.pathname;
  const isMainLayout = routes[path];

  return (
    <>
      <LoadScript />
      <WagmiConfig client={client}>
        <ThemeProvider theme={theme}>
          {/*
          @ts-ignore */}

          <SnackbarProvider maxSnack={3}>
            <Provider store={store}>
              {isMainLayout && (
                <MainLayout showBanner={pageProps.showBanner}>
                  <Component {...pageProps} />
                </MainLayout>
              )}
              {!isMainLayout && (
                <PersonalDashboardLayout>
                  <Component {...pageProps} />
                </PersonalDashboardLayout>
              )}
            </Provider>
          </SnackbarProvider>
        </ThemeProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
