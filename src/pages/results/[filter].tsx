import { appRouter } from "@router/index";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import FilterListBox from "src/components/FilterListBox";
import MemeListing from "src/components/MemeListing";
import MobileNav from "src/components/MobileNav";
import UploadForm from "src/components/UploadForm";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";

type FilterTypes = "get-top-day-memes" | "get-top-week-memes";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { filter: "day" } }, { params: { filter: "week" } }],
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ filter: string }>
) => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const filter: FilterTypes =
    `get-top-${context.params?.filter}-memes` as FilterTypes;

  await ssg.fetchQuery(filter);
  console.log(filter);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      filter,
    },
    revalidate: 1,
  };
};

const ResultsFilter = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const { filter } = props;
  const { data: memes, isLoading } = trpc.useQuery([filter], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen bg-slate-600">
      <Head>
        <title>Showdown / Funniest Meme Results</title>
      </Head>
      <MobileNav toggleForm={setShowUploadForm} />
      {showUploadForm && <UploadForm toggleActive={setShowUploadForm} />}

      <div className="w-full text-xl text-white text-center p-2 hidden sm:block">
        <Link href="/home">
          <a className="hover:text-slate-300">Home</a>
        </Link>
        <span className="p-1">{" | "}</span>
        <span>Results Page</span>
      </div>
      <FilterListBox />
      {memes && (
        <div className="flex flex-col w-full max-w-3xl">
          {memes.map((meme: any, index: number) => {
            return <MemeListing meme={meme} rank={index + 1} key={index} />;
          })}
        </div>
      )}
      {isLoading && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-96 h-96"
          src="/ripple_1s_200s.svg"
          alt="Ripple loader indicator"
        />
      )}
    </div>
  );
};

export default ResultsFilter;
