/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { AuthProvider } from "@/lib/constants/AuthContext";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import SetupHeader from "@/components/@shared/UI/SetupHeader";
import AuthHeader from "@/components/@shared/UI/AuthHeader";

function HeaderWrapper({ headerType }: { headerType?: string }) {
  const { data: session, status } = useSession();

  if (headerType === "setup") {
    return <SetupHeader />;
  }

  if (status === "authenticated" && session?.user) {
    return <AuthHeader />;
  }
  return <SetupHeader />;
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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HeaderWrapper />
          <div className="pt-[60px]">
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
