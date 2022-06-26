import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>kpoppop / Showdown</title>
        <meta
          name="description"
          content="KPOP Meme Showdown, upload and vote for the funniest meme."
        />
      </Head>

      <p className="flex items-center justify-center h-screen font-bold text-2xl md:text-5xl bg-mina">
        <Link href="/home">
          <a className="animate-[bounce_2s_linear_infinite] text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-ponce hover:to-once">
            Welcome to the Showdown!
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Index;
