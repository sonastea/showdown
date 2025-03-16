import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "@/server/api/routers/admin";
import { postRouter } from "@/server/api/routers/post";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
