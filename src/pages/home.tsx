import { NextPage } from "next";
import Head from "next/head";
import UploadForm from "../components/UploadForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Showdown / Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UploadForm />
      <div className="bg-slate-600 h-screen w-screen flex flex-col items-center justify-center relative">
        <div className="text-xl text-white text-center pt-8">
          Which meme is funnier?
        </div>
      </div>
    </>
  );
};

export default Home;
