import * as trpc from "@trpc/server";
import { adminRouter } from "./admin";
import { memeRouter } from "./meme";

export const appRouter = trpc
  .router()
  .merge("meme.", memeRouter)
  .merge("admin.", adminRouter);

export type AppRouter = typeof appRouter;
