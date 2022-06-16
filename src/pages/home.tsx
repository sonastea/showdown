import { NextPage } from "next";
import { usePlausible } from "next-plausible";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { trpc } from "src/utils/trpc";
import UploadForm from "../components/UploadForm";
import { inferQueryResponse } from "./api/trpc/[trpc]";

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

  const plausible = usePlausible();
  const voteForMeme = trpc.useMutation(["add-vote"]);

  const handleVoteForFunnier = (select: string) => {
    if (!memePair) return;

    if (memePair?.meme1.id === select) {
      voteForMeme.mutate({ votedFor: memePair.meme1.id });
    } else {
      voteForMeme.mutate({ votedFor: memePair.meme2.id });
    }

    plausible("add-vote");
    refetch();
  };

  const fetchingNext = isLoading || voteForMeme.isLoading;

  return (
    <>
      <Head>
        <title>Showdown / Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-600 min-h-screen w-screen flex flex-col items-center justify-center relative">
        <UploadForm />
        {memePair && (
          <div className="flex flex-col">
            <div className="m-6 text-xl text-white text-center">
              Which meme is funnier?
            </div>
            <div className="flex shrink justify-between items-center flex-col md:flex-row animate-fade-in">
              <MemeContainer
                meme={memePair.meme1}
                vote={() => handleVoteForFunnier(memePair.meme1.id)}
                disabled={fetchingNext}
              />
              <div className="p-6 font-bold text-xl text-ponce">vs</div>
              <MemeContainer
                meme={memePair.meme2}
                vote={() => handleVoteForFunnier(memePair.meme2.id)}
                disabled={fetchingNext}
              />
            </div>
          </div>
        )}
        {!memePair && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-96 h-96"
            src="/ripple_1s_200s.svg"
            alt="Ripple loader indicator"
          />
        )}
      </div>
    </>
  );
};

const MemeContainer: React.FC<{
  meme: inferQueryResponse<"get-meme-pair">["meme1"];
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  const { meme, vote, disabled } = props;

  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96">
        <Image
          alt=""
          className="animate-fade-in"
          layout="fill"
          src={meme.url}
          priority={true}
        />
      </div>
      <button
        className="font-medium shadow-sm m-4 p-2 text-xl md:text-3xl bg-once/90 text-white hover:animate-[pulse_0.75s_ease-in-out_infinite] rounded-md focus:outline-none focus:ring-ponce focus:ring-2 focus:ring-offset-2"
        onClick={() => vote()}
        disabled={disabled}
      >
        HAHA
      </button>
    </div>
  );
};

export default Home;
