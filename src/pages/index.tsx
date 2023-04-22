import { NextPage } from "next";
import { usePlausible } from "next-plausible";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MemePair } from "src/backend/trpc";
import MobileNav from "src/components/MobileNav";
import SubmitMemeButton from "src/components/SubmitMemeButton";
import UploadForm from "src/components/UploadForm";
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

  const plausible = usePlausible();
  const voteForMeme = trpc.meme.addVote.useMutation();

  const handleVoteForFunnier = (select: number) => {
    if (!memePair) return;

    if (memePair?.meme1.id === select) {
      voteForMeme.mutate({ votedFor: memePair.meme1.id });
    } else {
      voteForMeme.mutate({ votedFor: memePair.meme2.id });
    }

    plausible("add-vote");
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
      <div className="bg-slate-600 min-h-screen w-screen flex flex-col items-center sm:justify-between relative overflow-auto">
        <SubmitMemeButton
          formIsActive={showUploadForm}
          toggleForm={setShowUploadForm}
        />
        <MobileNav toggleForm={setShowUploadForm} />
        {showUploadForm && <UploadForm toggleActive={setShowUploadForm} />}
        {memePair && (
          <div className="flex flex-col">
            <div className="m-4 text-xl text-white text-center">
              Which meme is funnier?
            </div>
            <div className="flex shrink justify-between items-center flex-col md:flex-row animate-fade-in">
              <MemeContainer
                meme={memePair.meme1}
                vote={() => handleVoteForFunnier(memePair.meme1.id)}
                disabled={fetchingNext}
              />
              {memePair.meme2 ? (
                <>
                  <div className="p-6 font-bold text-xl text-ponce">vs</div>
                  <MemeContainer
                    meme={memePair.meme2}
                    vote={() => handleVoteForFunnier(memePair.meme2.id)}
                    disabled={fetchingNext}
                  />
                </>
              ) : (
                <div className="p-6 text-ponce text-xl md:text-3xl w-48 md:w-72 lg:w-96 text-center">
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
          <div className="w-full text-xl text-white text-center p-2 hidden sm:block">
            <Link className="hover:text-slate-300" href="/">
              Home
            </Link>
            <span>{" • "}</span>
            <Link className="hover:text-slate-300" href="/results">
              Results
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

const MemeContainer: React.FC<{
  meme: MemePair["meme1"];
  vote: () => void;
  disabled: boolean;
}> = ({ meme, vote, disabled }) => {
  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96">
        <Image
          alt=""
          className="animate-fade-in"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 18rem,
                  (max-width: 1280px) 24rem,
                  12rem
          "
          src={meme.url}
          priority={false}
        />
      </div>
      <button
        className="font-medium shadow-sm m-4 p-2 text-xl md:text-3xl bg-once/90 text-[#5b0126] disabled:bg-once/40 disabled:cursor-not-allowed enabled:hover:animate-[pulse_0.75s_ease-in-out_infinite] rounded-md focus:outline-none focus:ring-ponce focus:ring-2 focus:ring-offset-2"
        onClick={() => vote()}
        disabled={disabled}
      >
        HAHA
      </button>
    </div>
  );
};

export default Home;
