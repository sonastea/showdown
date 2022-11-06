import { AppRouter } from "@router/_app";
import { inferRouterOutputs, initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

type RouterOutput = inferRouterOutputs<AppRouter>;

export type MemePair = RouterOutput["meme"]["getMemePair"];
export type TopAllMemes = RouterOutput["meme"]["getTopAllMemes"]["memes"][0];
export type TopDayMemes = RouterOutput["meme"]["getTopDayMemes"][0];
export type TopWeekMemes = RouterOutput["meme"]["getTopWeekMemes"][0];
