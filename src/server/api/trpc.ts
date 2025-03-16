import { inferRouterOutputs, initTRPC } from "@trpc/server";
import { db } from "@/lib/drizzle";
import { AppRouter } from "./_app";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

type RouterOutput = inferRouterOutputs<AppRouter>;

export type PostsArray = RouterOutput["post"]["getHomepageFeed"];
export type PostData = RouterOutput["post"]["getHomepageFeed"][number];
