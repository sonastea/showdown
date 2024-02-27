import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

const Footer = dynamic(() => import("src/components/Footer"));
const Meme = dynamic(() => import("src/components/Meme"));
const MobileNav = dynamic(() => import("src/components/MobileNav"));
const SubmitMemeButton = dynamic(
  () => import("src/components/SubmitMemeButton"),
);
const UploadForm = dynamic(() => import("src/components/UploadForm"));

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
    if (!memePair || select === -1) return;

    if (memePair?.meme1.id === select) {
      voteForMeme.mutate({ votedFor: memePair.meme1.id });
    } else if (memePair?.meme2.id === select) {
      voteForMeme.mutate({ votedFor: memePair.meme2.id });
    }

    refetch();
  };

  const fetchingNext = isLoading || voteForMeme.isPending || !memePair?.meme2;

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
            <div className="mb-4 font-semibold text-xl md:text-3xl text-mina-200 text-center">
              Which is funnier?
            </div>
            <div className="flex shrink justify-between items-center flex-col md:flex-row animate-fade-in">
              <Meme
                meme={memePair.meme1}
                vote={() => handleVoteForFunnier(memePair.meme1.id ?? -1)}
                disabled={fetchingNext}
              />
              {memePair.meme2 ? (
                <>
                  <div className="hidden md:block md:p-6 text-xl text-mina-50">
                    ⚔️
                  </div>
                  <Meme
                    meme={memePair.meme2}
                    vote={() => handleVoteForFunnier(memePair.meme2.id ?? -1)}
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
        <Footer />
      </div>
    </>
  );
};
export default Home;
