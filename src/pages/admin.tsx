import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session.user.email,
    },
  };
}

const skeleton = new Array(10).fill(0);

const Admin: NextPage = () => {
  const [removed, setRemoved] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data,
    fetchPreviousPage,
    fetchNextPage,
    isFetching,
    hasPreviousPage,
  } = trpc.useInfiniteQuery(["admin.get-recent-memes", {}], {
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idx = parseInt(e.currentTarget.dataset.id as string);
    deleteMeme.mutateAsync({ id: idx }).then((res) => {
      if (res.success) {
        setRemoved((prev) => [...prev, idx]);
      }
    });
  };

  const deleteMeme = trpc.useMutation("admin.delete-meme");

  return (
    <>
      <Head>
        <title>Showdown / Admin</title>
        <meta name="description" content="Admin page for the showdown" />
      </Head>
      <div className="bg-slate-600 min-h-screen w-screen">
        <div className="flex justify-center p-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex flex-wrap">
              <li>
                <button
                  className="px-2 text-once transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline disabled:bg-white/80 disabled:cursor-not-allowed"
                  disabled={page === 1 || hasPreviousPage}
                  onClick={() => {
                    fetchPreviousPage().then((res) => {
                      if (res.isSuccess) {
                        setPage((page) => page - 1);
                      }
                    });
                  }}
                >
                  Prev
                </button>
              </li>
              <li>
                <button className="px-2 text-white bg-once transition-colors duration-150">
                  {page}
                </button>
              </li>

              <li>
                <button
                  className="px-2 text-once transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline disabled:bg-white/80 disabled:cursor-not-allowed"
                  disabled={!data?.pages[page - 1].nextCursor}
                  onClick={() => {
                    fetchNextPage().then((res) => {
                      if (res.isSuccess) {
                        setPage((page) => page + 1);
                      }
                    });
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col">
          <ul>
            {data &&
              data.pages[page - 1].memes.map((meme) => (
                <li className="flex flex-wrap justify-around p-2" key={meme.id}>
                  <span className="text-white self-center m-2">{meme.id}</span>
                  <Image src={meme.url} width={96} height={96} alt="" />
                  <button
                    className="w-12 text-white bg-once h-8 px-1 text-sm rounded-lg self-center m-2 disabled:w-16 disabled:cursor-not-allowed disabled:bg-once/80 disabled:line-through"
                    data-id={meme.id}
                    onClick={handleDelete}
                    disabled={removed.includes(meme.id)}
                  >
                    {removed.includes(meme.id) ? "DELETED" : "Delete"}
                  </button>
                </li>
              ))}
            {isFetching &&
              skeleton.map((s, index: number) => {
                return <MemeListingSkeleton key={index} />;
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

const MemeListingSkeleton = () => {
  return (
    <li className="flex flex-wrap justify-around animate-pulse p-2">
      <div className="text-gray-200 self-center m-2 blur-sm">0</div>
      <div
        className="bg-gray-200"
        style={{ width: "96px", height: "96px" }}
      ></div>
      <button className="w-12 bg-gray-200 h-8 px-1 text-sm rounded-lg self-center m-2 disabled:cursor-not-allowed disabled:bg-once/80 disabled:line-through"></button>
    </li>
  );
};

export default Admin;
