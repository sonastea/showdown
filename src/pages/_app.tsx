import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="showdown.vercel.app">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@router/index";
import PlausibleProvider from "next-plausible";

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    let url: string = "";

    if (typeof window !== undefined) {
      url = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : `http://localhost:${
            process.env.PORT ?? 3000
          }/api/trpc`;
      console.log(url);
    }

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
