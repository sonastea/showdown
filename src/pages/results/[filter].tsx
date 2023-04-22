import { appRouter } from "@router/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { filter: "day" } }, { params: { filter: "week" } }],
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ filter: string }>
) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const filter = context.params?.filter as string;
  switch (context.params?.filter) {
    case "day":
      await ssg.meme.getTopDayMemes.prefetch();
      break;

    case "week":
      await ssg.meme.getTopWeekMemes.prefetch();
      break;
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      filter,
    },
    revalidate: 10,
  };
};

const ResultsFilter = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const { filter } = props;

  const { data, isLoading } =
    filter === "day"
      ? trpc.meme.getTopDayMemes.useQuery()
      : trpc.meme.getTopWeekMemes.useQuery();

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen bg-slate-600">
      <Head>
        <title>Showdown / Funniest Meme Results</title>
      </Head>
      <MobileNav toggleForm={setShowUploadForm} />
      {showUploadForm && <UploadForm toggleActive={setShowUploadForm} />}

      <div className="w-full text-xl text-white text-center p-2 hidden sm:block">
        <Link className="hover:text-slate-300" href="/home">
          Home
        </Link>
        <span className="p-1">{" | "}</span>
        <span>Results Page</span>
      </div>
      <FilterListBox />
      {data && (
        <div className="flex flex-col w-full max-w-3xl divide-y divide-slate-500">
          {data.map((meme: any, index: number) => {
            return <MemeListing meme={meme} rank={index + 1} key={index} />;
          })}
        </div>
      )}
      {isLoading && (
        <picture>
          <img
            className="w-96 h-96"
            src="/ripple_1s_200s.svg"
            alt="Ripple loader indicator"
          />
        </picture>
      )}
    </div>
  );
};

export default ResultsFilter;
