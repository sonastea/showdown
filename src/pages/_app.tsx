import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import Head from "next/head";
import { trpc } from "src/utils/trpc";
import "../styles/globals.css";

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

export default trpc.withTRPC(MyApp);
