import { inferRouterOutputs, initTRPC } from "@trpc/server";
import { AppRouter } from "./_app";
import { db } from "./db";
import { createClient } from "@/utils/supabase/server";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return {
    db,
    user,
    opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const middleware = t.middleware;

export const publicProcedure = t.procedure;

type RouterOutput = inferRouterOutputs<AppRouter>;

export type UserMe = RouterOutput["user"]["me"];
