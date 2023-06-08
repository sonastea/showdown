import { NextPage } from "next";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import MobileNav from "src/components/MobileNav";
import SubmitMemeButton from "src/components/SubmitMemeButton";
import UploadForm from "src/components/UploadForm";
import { Meme } from "src/lib/drizzle";
import { trpc } from "src/utils/trpc";

const Home: NextPage = () => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const {
    data: memePair,
    refetch,
    isError,
    isLoading,
  } = trpc.meme.getMemePair.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteForMeme = trpc.meme.addVote.useMutation();

  const handleVoteForFunnier = (select: number) => {
    if (!memePair) return;

    if (memePair?.meme1.id === select) {
      voteForMeme.mutate({ votedFor: memePair.meme1.id });
    } else {
      voteForMeme.mutate({ votedFor: memePair.meme2.id });
    }

    refetch();
  };

  const fetchingNext = isLoading || voteForMeme.isLoading || !memePair?.meme2;

  return (
    <>
      <Head>
        <title>Showdown / Home</title>
        <meta
          name="description"
          content="KPOP Meme Showdown, upload and vote for the funniest meme."
        />
      </Head>
      <div className="bg-slate-600 min-h-screen flex flex-col items-center justify-between relative overflow-hidden">
        <SubmitMemeButton
          formIsActive={showUploadForm}
          toggleForm={setShowUploadForm}
        />
        <MobileNav toggleForm={setShowUploadForm} />
        {showUploadForm && (
          <UploadForm refetchPair={refetch} toggleActive={setShowUploadForm} />
        )}
        {memePair && (
          <div className="flex flex-col">
            <div className="mb-4 font-semibold text-xl text-mina-200 text-center">
              Which is funnier?
            </div>
            <div className="flex shrink justify-between items-center flex-col md:flex-row animate-fade-in">
              <MemeContainer
                meme={memePair.meme1}
                vote={() => handleVoteForFunnier(memePair.meme1.id)}
                disabled={fetchingNext}
              />
              {memePair.meme2 ? (
                <>
                  <div className="hidden md:block md:p-6 text-xl text-mina-50">
                    ⚔️
                  </div>
                  <MemeContainer
                    meme={memePair.meme2}
                    vote={() => handleVoteForFunnier(memePair.meme2.id)}
                    disabled={fetchingNext}
                  />
                </>
              ) : (
                <div className="p-6 text-mina-50 text-xl md:text-3xl w-48 md:w-72 lg:w-96 text-center">
                  Upload meme for the showdown!
                </div>
              )}
            </div>
          </div>
        )}
        {!memePair && !isError && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-96 h-96"
            src="/ripple_1s_200s.svg"
            alt="Ripple loader indicator"
          />
        )}
        <footer>
          <div className="w-full text-xl text-mina-50 text-center p-2 hidden sm:block">
            <Link className="text-mina-50 hover:text-mina-300" href="/">
              Home
            </Link>
            <span>{" • "}</span>
            <Link className="text-mina-50 hover:text-mina-200" href="/results">
              Results
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

const MemeContainer: React.FC<{
  meme: Meme;
  vote: () => void;
  disabled: boolean;
}> = ({ meme, vote, disabled }) => {
  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96">
        <CldImage
          className="object-contain"
          alt={meme.name.split("/")[1]}
          src={meme.url}
          fill
          priority
          sizes="(max-width: 768px) 18rem,
                  (max-width: 1280px) 24rem,
                  12rem
          "
        />
      </div>
      <button
        className="font-medium shadow-[0_1px_3px_0_hsla(0,0%,0%,.5)] m-4 p-2 px-6 text-xl md:text-3xl bg-mina-200 text-mina-900 hover:bg-mina-300 disabled:bg-mina-200/70 disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-mina focus:ring-2 focus:ring-offset-2"
        onClick={() => vote()}
        disabled={disabled}
      >
        😂
      </button>
    </div>
  );
};

export default Home;
