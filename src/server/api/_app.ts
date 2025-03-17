import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "@/server/api/routers/admin";
import { userRouter } from "@/server/api/routers/user";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
