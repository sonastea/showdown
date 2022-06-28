import { prisma } from "@db/client";
import * as trpc from "@trpc/server";
import { z } from "zod";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const adminRouter = trpc
  .router()
  .query("get-recent-memes", {
    input: z.object({
      cursor: z.number().nullish().default(0),
    }),
    async resolve({ input }) {
      const limit = 10;
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
        take: limit + 1,
      });

      let prevCursor: typeof input.cursor | undefined = undefined;
      let nextCursor: typeof input.cursor | undefined = undefined;

      if (input.cursor) prevCursor = memes[0]?.id - limit;

      if (memes.length > limit) {
        const nextItem = memes.pop();
        nextCursor = nextItem?.id;
      }

      return {
        memes,
        prevCursor,
        nextCursor,
      };
    },
  })
  .mutation("delete-meme", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const deleted = await prisma.meme.delete({
        where: {
          id: input.id,
        },
      });
      await cloudinary.uploader.destroy(deleted.name);

      return { success: true, meme: deleted };
    },
  });
