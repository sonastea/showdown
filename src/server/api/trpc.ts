import { inferRouterOutputs, initTRPC } from "@trpc/server";
import { AppRouter } from "./_app";
import { db } from "./db";

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
