import '@/styles/globals.css';
import type { AppProps } from "../../node_modules/next/app";
import Layout from '../components/Layout';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  const { session } = pageProps;


  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
