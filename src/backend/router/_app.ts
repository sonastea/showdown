import { router } from "../trpc";
import { adminRouter } from "./admin";
import { memeRouter } from "./meme";

export const appRouter = router({
  meme: memeRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
