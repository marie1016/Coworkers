/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/core/context/AuthProvider";
import { SessionProvider} from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";


import SetupHeader from "@/components/@shared/UI/SetupHeader";
import AuthHeader from "@/components/@shared/UI/AuthHeader";

function HeaderWrapper({ headerType }: { headerType?: string }) {
  const { user, isPending } = useAuth();
  const [isAuthHeaderVisible, setIsAuthHeaderVisible] = useState(false);

  useEffect(() => {
    if (user && !isPending) {
      setIsAuthHeaderVisible(true);
    } else {
      setIsAuthHeaderVisible(false);
    }
  }, [user, isPending]);


  if (headerType === "setup") {
    return <SetupHeader />;
  }

  return isAuthHeaderVisible ? <AuthHeader /> : <SetupHeader />;
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000,
            throwOnError: true,
          },
        },
      }),
  );

  return (


    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HeaderWrapper />
           <ToastContainer
          toastClassName="bg-background-secondary"
          bodyClassName="text-text-primary font-sans text-text-md"
          position="top-center"
          autoClose={1000}
          pauseOnHover
          limit={1}
          theme="dark"
          closeOnClick
        />
          <div className="pt-[60px]">
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>


  );
}
