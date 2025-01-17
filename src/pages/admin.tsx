import { GetServerSidePropsContext, NextPage } from "next";
import { CldImage } from "next-cloudinary";
import Head from "next/head";
import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import MemeListingSkeleton from "src/components/MemeListingSkeleton";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
  const router = useRouter();

  const [page, setPage] = useState<number>(
    router.query.page ? Number(router.query.page) : 1
  );
  const [removed, setRemoved] = useState<number[]>([]);
  const { data, isFetching } = trpc.admin.getRecentMemes.useQuery(
    { cursor: page - 1 || 0 },
    { refetchInterval: false, refetchOnWindowFocus: false }
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
                  disabled={page === 1}
                  onClick={() => {
                    setPage((page) => page - 1);
                    router.push(`/admin?page=${page - 1}`);
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
                  disabled={!data?.nextCursor}
                  onClick={() => {
                    setPage((page) => page + 1);
                    router.push(`/admin?page=${page + 1}`);
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
              data.memes.map((meme) => (
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

export default Admin;
