import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PlausibleProvider domain="showdown.vercel.app">
        <Head>
          <meta name="title" content="kpoppop / Showdown" />
          <meta lang="en" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </PlausibleProvider>
    </SessionProvider>
  );
}

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@router/index";
import PlausibleProvider from "next-plausible";
import Head from "next/head";

function getBaseUrl() {
  if (typeof window === "undefined") return ""; // Browser should use current path
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`; // SSR should use vercel url

  return `http://${window.location.hostname}:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
