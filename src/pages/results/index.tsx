import { prisma } from "@db/client";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import FilterListBox from "src/components/FilterListBox";
import MemeListing from "src/components/MemeListing";
import MobileNav from "src/components/MobileNav";
import UploadForm from "src/components/UploadForm";

const getTopMemes = async () => {
  return await prisma.meme.findMany({
    orderBy: { VotesFor: { _count: "desc" } },
    select: {
      id: true,
      url: true,
      _count: {
        select: {
          VotesFor: true,
        },
      },
    },
    take: 50,
  });
};

export async function getStaticProps() {
  const memes = await getTopMemes();
  return { props: { memes }, revalidate: 7200 };
}

const Results: React.FC<{ memes: any }> = ({ memes }) => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen bg-slate-600">
      <Head>
        <title>Showdown / Funniest Meme Results</title>
      </Head>
      <MobileNav toggleForm={setShowUploadForm} />
      <div className="w-full text-xl text-white text-center p-2 hidden sm:block">
        <Link href="/home">
          <a className="hover:text-slate-300">Home</a>
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
