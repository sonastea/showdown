import { comments, posts, users, votes } from "@/db/schema";
import { sql } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getHomepageFeed: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        category: posts.category,
        tags: posts.tags,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
        },
        _count: {
          comments: sql<number>`COUNT(DISTINCT ${comments.id})`.as("comments"),
          votes: sql<number>`COALESCE(SUM(${votes.value}), 0)`.as("votes"),
        },
      })
      .from(posts)
      .leftJoin(users, sql`${users.id} = ${posts.authorId}`) // Include author details
      .leftJoin(comments, sql`${comments.postId} = ${posts.id}`)
      .leftJoin(votes, sql`${votes.postId} = ${posts.id}`)
      .groupBy(posts.id, users.id) // Group by post & author
      .orderBy(sql`${posts.createdAt} DESC`)
      .limit(10);
  }),
});
