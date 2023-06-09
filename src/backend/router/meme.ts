import { createId } from "@paralleldrive/cuid2";
import { desc, eq, gte, sql } from "drizzle-orm";
import { meme, vote } from "drizzle/schema";
import { Meme, db } from "src/lib/drizzle";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const YESTERDAY = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const WEEK = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

export const memeRouter = router({
  getMemePair: publicProcedure.query(async () => {
    const bothMemes: Meme[] = await db
      .execute(
        sql`SELECT * FROM Meme AS t1 JOIN (SELECT id FROM Meme ORDER BY rand() LIMIT 2) AS t2 ON t1.id = t2.id`
      )
      .then((res) => res.rows as Meme[]);

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
      const voted = await db.insert(vote).values({
        id: createId(),
        votedForId: input.votedFor,
      });

      return { success: true, vote: voted };
    }),
  getTopAllMemes: publicProcedure.query(async () => {
    const memes = await db
      .select({
        id: meme.id,
        name: meme.name,
        url: meme.url,
        VotesFor: sql<number>`count(${vote.id})`,
      })
      .from(meme)
      .leftJoin(vote, eq(meme.id, vote.votedForId))
      .groupBy(meme.id)
      .orderBy((meme) => desc(meme.VotesFor));

    return memes;
  }),
  getTopDayMemes: publicProcedure.query(async () => {
    const memes = await db
      .select({
        id: meme.id,
        name: meme.name,
        url: meme.url,
        VotesFor: sql<number>`count(${vote.id})`,
      })
      .from(meme)
      .leftJoin(vote, eq(meme.id, vote.votedForId))
      .where(gte(vote.createdAt, YESTERDAY.toISOString()))
      .groupBy(meme.id)
      .orderBy((meme) => desc(meme.VotesFor));

    return memes;
  }),
  getTopWeekMemes: publicProcedure.query(async () => {
    const memes = await db
      .select({
        id: meme.id,
        name: meme.name,
        url: meme.url,
        VotesFor: sql<number>`count(${vote.id})`,
      })
      .from(meme)
      .leftJoin(vote, eq(meme.id, vote.votedForId))
      .where(gte(vote.createdAt, WEEK.toISOString()))
      .groupBy(meme.id)
      .orderBy((meme) => desc(meme.VotesFor));

    return memes;
  }),
});
