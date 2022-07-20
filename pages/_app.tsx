import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useUserStore } from '../store/UserStore';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useOwnData } from '../modules/Profile/GetOwnDataService';
import 'react-datepicker/dist/react-datepicker.css';

const queryClient = new QueryClient();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = useUserStore();
  const cookies = new Cookies();
  const isLoggedIn = cookies.get('isLoggedIn');

  const { data, refetch } = useOwnData({
    options: {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  });

  useEffect(() => {
    if (!user && isLoggedIn) {
      refetch();
    }
  }, [user, isLoggedIn, setUser, refetch]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
