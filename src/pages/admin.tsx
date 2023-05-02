import { NextPage } from "next";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
  } = trpc.admin.getRecentMemes.useInfiniteQuery(
    {
      getPreviousPageParam: (firstPage: { prevCursor: number }) =>
        firstPage.prevCursor,
      getNextPageParam: (lastPage: { nextCursor: number }) =>
        lastPage.nextCursor,
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idx = parseInt(e.currentTarget.dataset.id as string);
    deleteMeme.mutateAsync({ id: idx }).then((res) => {
      if (res.success) {
        setRemoved((prev) => [...prev, idx]);
      }
    });
  };

  const deleteMeme = trpc.admin.deleteMeme.useMutation();

  return (
    <>
      <Head>
        <title>Showdown / Admin</title>
        <meta name="description" content="kpop showdown admin page" />
      </Head>
      <div className="bg-slate-600 min-h-screen w-screen">
        <div className="flex justify-center p-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex flex-wrap">
              <li>
                <button
                  className="px-4 py-1 text-mina-200 transition-colors duration-150 bg-mina-800 hover:bg-mina-800/70 rounded-l-lg focus:shadow-outline disabled:bg-mina-800/70 disabled:cursor-not-allowed"
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
                <button className="px-4 py-1 text-mina-900 bg-mina-100 transition-colors duration-150">
                  {page}
                </button>
              </li>

              <li>
                <button
                  className="px-4 py-1 text-mina-200 transition-colors duration-150 bg-mina-800 hover:bg-mina-800/70 rounded-r-lg focus:shadow-outline disabled:bg-mina-800/70 disabled:cursor-not-allowed"
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
                  <span className="text-mina-50 self-center m-2 w-24 overflow-x-auto">
                    {meme.id}
                  </span>
                  <CldImage
                    className="w-24 h-24 object-contain"
                    width={96}
                    height={96}
                    src={meme.url}
                    alt={meme.name.split("/")[1]}
                    priority
                  />
                  <button
                    className="p-1 text-mina-900 bg-mina-300 hover:bg-mina-300/90 text-sm rounded-md self-center m-2 disabled:w-16 disabled:cursor-not-allowed disabled:bg-mina/80 disabled:line-through"
                    data-id={meme.id}
                    onClick={handleDelete}
                    disabled={removed.includes(meme.id)}
                  >
                    {removed.includes(meme.id) ? "DELETED" : "Delete"}
                  </button>
                </li>
              ))}
            {isFetching &&
              skeleton.map((_, index: number) => {
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
      <div className="text-gray-200 self-center m-2 blur-sm w-24">0</div>
      <div
        className="bg-gray-200"
        style={{ width: "96px", height: "96px" }}
      ></div>
      <button className="w-12 bg-gray-200 h-8 px-1 text-sm rounded-lg self-center m-2 disabled:cursor-not-allowed disabled:bg-mina-400/80 disabled:line-through"></button>
    </li>
  );
};

export default Admin;
