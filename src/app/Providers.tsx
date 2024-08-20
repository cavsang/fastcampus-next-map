"use client"; //app폴더 내부에는 ServerComponent로 작동하는데.. 이걸해줘야지만.. ClientComponent로 작동한다.

import '@/styles/globals.css';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';

const queryClient = new QueryClient();

interface Props {
    children?: React.ReactNode
}

export const NextProviders = ({ children }: Props) => {

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    {children}
                    <ToastContainer autoClose={1000} pauseOnFocusLoss={false} pauseOnHover={false} />
                    <ReactQueryDevtools />
                </SessionProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
}


export const NextLayout = ({children}:Props) => {
    return(
        <div className="layout">
            <Navbar />
            {children}
        </div>
    )
}