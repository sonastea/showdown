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
        createdAt:
          sql<string>`TO_CHAR(${posts.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.as(
            "createdAt"
          ),
        category: posts.category,
        tags: sql<string[]>`${posts.tags}::jsonb`.as("tags"),
        author: {
          id: sql<string>`COALESCE(${users.id}, 'unknown')`.as("id"),
          name: sql<string>`COALESCE(${users.name}, 'Deleted User')`.as("name"),
          username: sql<string>`COALESCE(${users.username}, '[deleted]')`.as(
            "username"
          ),
          image:
            sql<string>`COALESCE(${users.image}, '/default_avatar.png')`.as(
              "image"
            ),
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
