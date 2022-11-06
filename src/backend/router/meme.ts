import { prisma } from "@db/client";
import { Meme } from "@prisma/client";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const memeRouter = router({
  getMemePair: publicProcedure.query(async () => {
    const bothMemes: Meme[] =
      await prisma.$queryRaw`SELECT * from Meme order by rand() limit 2;`;

    if (bothMemes.length < 1) {
      throw new Error("Could not retrieve memes");
    }

    return { meme1: bothMemes[0], meme2: bothMemes[1] };
  }),
  addVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const voted = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voted };
    }),
  getTopAllMemes: publicProcedure.query(async () => {
    const memes = await prisma.meme.findMany({
      orderBy: { VotesFor: { _count: "desc" } },
      select: {
        id: true,
        url: true,
        _count: {
          select: {
            VotesFor: true,
          },
        },
      },
      take: 50,
    });
    return { memes };
  }),
  getTopDayMemes: publicProcedure.query(async () => {
    const memes = await prisma.meme.findMany({
      take: 25,
      select: {
        id: true,
        name: true,
        url: true,
        VotesFor: {
          where: {
            createdAt: {
              gte: new Date(
                new Date().toJSON().slice(0, 10).replace(/-/g, "-")
              ),
            },
          },
        },
      },
      orderBy: {
        VotesFor: {
          _count: "desc",
        },
      },
    });
    return memes;
  }),
  getTopWeekMemes: publicProcedure.query(async () => {
    const memes = await prisma.meme.findMany({
      take: 25,
      select: {
        id: true,
        name: true,
        url: true,
        VotesFor: {
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
        },
      },
      orderBy: {
        VotesFor: {
          _count: "desc",
        },
      },
    });
    return memes;
  }),
});
