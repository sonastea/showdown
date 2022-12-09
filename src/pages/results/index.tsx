import { appRouter } from "@router/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import FilterListBox from "src/components/FilterListBox";
import MemeListing from "src/components/MemeListing";
import MobileNav from "src/components/MobileNav";
import UploadForm from "src/components/UploadForm";
import superjson from "superjson";

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const memes = await ssg.meme.getTopAllMemes.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      memes,
    },
    revalidate: 3600,
  };
}

const Results = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const { memes } = props.memes;

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen bg-slate-600">
      <Head>
        <title>Showdown / Funniest Meme Results</title>
      </Head>
      <MobileNav toggleForm={setShowUploadForm} />
      <div className="w-full text-xl text-white text-center p-2 hidden sm:block">
        <Link className="hover:text-slate-300" href="/home">
          Home
        </Link>
        <span className="p-1">{" | "}</span>
        <span>Results Page</span>
      </div>
      {showUploadForm && <UploadForm toggleActive={setShowUploadForm} />}

      <FilterListBox />
      <div className="flex flex-col w-full max-w-3xl divide-y divide-slate-500">
        {memes &&
          memes.map((meme: any, index: number) => {
            return <MemeListing meme={meme} rank={index + 1} key={meme.id} />;
          })}
      </div>
    </div>
  );
};

export default Results;
