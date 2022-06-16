import * as trpc from "@trpc/server";
import { prisma } from "@db/client";
import { Meme } from "@prisma/client";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("get-meme-pair", {
    async resolve() {
      const bothMemes: Meme[] =
        await prisma.$queryRaw`SELECT * from Meme order by rand() limit 2;`;

      if (bothMemes.length < 1) {
        throw new Error("Could not retrieve memes");
      }

      return { meme1: bothMemes[0], meme2: bothMemes[1] };
    },
  })
  .mutation("add-vote", {
    input: z.object({
      votedFor: z.string(),
    }),
    async resolve({ input }) {
      const voted = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voted };
    },
  });

export type AppRouter = typeof appRouter;
