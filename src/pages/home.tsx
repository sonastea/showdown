import { Meme } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { trpc } from "src/utils/trpc";
import UploadForm from "../components/UploadForm";

const Home: NextPage = () => {
  const {
    data: memePair,
    refetch,
    isLoading,
  } = trpc.useQuery(["get-meme-pair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const fetchingNext = false;

  return (
    <>
      <Head>
        <title>Showdown / Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-600 min-h-screen w-screen flex flex-col items-center justify-center relative">
        <UploadForm />
        <div className="flex flex-col">
          <div className="p-6 text-xl text-white text-center pt-8">
            Which meme is funnier?
          </div>
          {memePair && (
            <div className="flex shrink justify-between items-center flex-col md:flex-row animate-fade-in">
              <MemeContainer
                meme={memePair.meme1}
                vote={() => null}
                disabled={fetchingNext}
              />
              <div className="p-6 font-bold text-xl text-ponce">vs</div>
              <MemeContainer
                meme={memePair.meme2}
                vote={() => null}
                disabled={fetchingNext}
              />
            </div>
          )}
          {!memePair && (
            <Image
              src="/ripple_1s_200s.svg"
              height={500}
              width={500}
              alt="Ripple loader indicator"
              priority={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

const MemeContainer: React.FC<{
  meme: Meme;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  const { meme, vote, disabled } = props;

  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="w-48 md:w-96 relative">
        <Image
          alt=""
          className="animate-fade-in"
          layout="responsive"
          src={meme.url}
          height={250}
          width={250}
          priority={true}
        />
      </div>
      <button
        className="p-2 text-5xl md:text-3xl hover:animate-[pulse_0.75s_ease-in-out_infinite]"
        onClick={() => vote()}
        disabled={disabled}
      >
        😂
      </button>
    </div>
  );
};

export default Home;
