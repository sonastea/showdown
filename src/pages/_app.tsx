import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { trpc } from "src/utils/trpc";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="title" content="kpoppop / Showdown" />
        <meta lang="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <Script
        async
        src="https://umami-sonastea.vercel.app/script.js"
        data-website-id="7929859d-da7e-4c99-ae19-3817ea539797"
        data-domains="kpopshowdown.com"
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
