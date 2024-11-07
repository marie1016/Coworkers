import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { AuthProvider } from "@/core/context/AuthProvider";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer
          toastClassName="[&&]:bg-background-secondary"
          bodyClassName="text-text-primary font-sans text-text-md"
          position="top-center"
          autoClose={1000}
          pauseOnHover
          limit={1}
          theme="dark"
          closeOnClick
        />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
