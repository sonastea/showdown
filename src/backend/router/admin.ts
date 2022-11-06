import { prisma } from "@db/client";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LIMIT_MEMES: number = 10;

export const adminRouter = router({
  getRecentMemes: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish().default(0),
      })
    )
    .query(async ({ input }) => {
      const memes = await prisma.meme.findMany({
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          name: true,
          url: true,
        },
        take: LIMIT_MEMES + 1,
      });

      let prevCursor: typeof input.cursor | undefined = undefined;
      let nextCursor: typeof input.cursor | undefined = undefined;

      if (input.cursor && memes[0]) prevCursor = memes[0].id - LIMIT_MEMES;

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
      const deleted = await prisma.meme.delete({
        where: {
          id: input.id,
        },
      });
      await cloudinary.uploader.destroy(deleted.name);

      return { success: true, meme: deleted };
    }),
});
