import { asc, eq } from "drizzle-orm";
import { meme } from "drizzle/schema";
import { db } from "src/lib/drizzle";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LIMIT_MEMES: number = 10;

export const adminRouter = router({
  getRecentMemes: publicProcedure
    .input(
      z.object({
        cursor: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      console.log(input)
      let memes;

      memes = await db
        .select({
          id: meme.id,
          name: meme.name,
          url: meme.url,
        })
        .from(meme)
        .limit(LIMIT_MEMES + 1)
        .offset(LIMIT_MEMES * input.cursor)
        .orderBy(asc(meme.id));

      let prevCursor: typeof input.cursor | undefined = undefined;
      let nextCursor: typeof input.cursor | undefined = undefined;

      if (memes[0]) prevCursor = memes[0].id;

      if (memes.length > LIMIT_MEMES) {
        const nextItem = memes.pop();
        nextCursor = nextItem?.id;
      }

      return {
        memes,
        prevCursor,
        nextCursor,
      };
    }),
  deleteMeme: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const deleting = await db
        .select({ name: meme.name })
        .from(meme)
        .where(eq(meme.id, input.id));

      if (deleting.length === 0) {
        return { success: false, meme: `Unable to delete ${input.id}` };
      }

      await db
        .delete(meme)
        .where(eq(meme.id, input.id))
        .then(async (res) => {
          if (res.rowsAffected === 1) {
            const destroy: { result: string } =
              await cloudinary.uploader.destroy(deleting[0].name);

            if (destroy.result === "ok")
              console.log(`Deleted from cloudinary ${deleting[0].name}`);
            if (destroy.result !== "ok")
              console.log(
                `Unable to delete from cloudinary ${deleting[0].name}`
              );
          }
        })
        .catch((err) => console.error(err));

      return { success: true, meme: input.id };
    }),
});
