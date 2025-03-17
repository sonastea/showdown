import { v2 as cloudinary } from "cloudinary";
import { createTRPCRouter } from "../trpc";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const adminRouter = createTRPCRouter({
  // getRecentMemes: publicProcedure
  //   .input(
  //     z.object({
  //       cursor: z.number().default(0),
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     const memes = await db
  //       .select({
  //         id: meme.id,
  //         name: meme.name,
  //         url: meme.url,
  //       })
  //       .from(meme)
  //       .limit(LIMIT_MEMES + 1)
  //       .offset(LIMIT_MEMES * input.cursor)
  //       .orderBy(asc(meme.id));
  //     let prevCursor: typeof input.cursor | undefined = undefined;
  //     let nextCursor: typeof input.cursor | undefined = undefined;
  //     if (memes[0]) prevCursor = memes[0].id;
  //     if (memes.length > LIMIT_MEMES) {
  //       const nextItem = memes.pop();
  //       nextCursor = nextItem?.id;
  //     }
  //     return {
  //       memes,
  //       prevCursor,
  //       nextCursor,
  //     };
  //   }),
  // deleteMeme: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .mutation(async ({ input }) => {
  //     const deleting = await db
  //       .select({ name: meme.name })
  //       .from(meme)
  //       .where(eq(meme.id, input.id));
  //     if (deleting.length === 0) {
  //       return { success: false, meme: `Unable to delete ${input.id}` };
  //     }
  //     const result = await db
  //       .delete(meme)
  //       .where(eq(meme.id, input.id))
  //       .returning({ id: meme.id })
  //       .catch((err) => console.error(err));
  //     if (result && result[0].id) {
  //       const destroy: { result: string } = await cloudinary.uploader.destroy(
  //         deleting[0].name
  //       );
  //       if (destroy.result !== "ok") {
  //         console.log(
  //           `Unable to delete from cloudinary ${deleting[0].name} - ${result[0].id}`
  //         );
  //         return { success: false, meme: input.id };
  //       }
  //       console.log(
  //         `Deleted from cloudinary ${deleting[0].name} - ${result[0].id}`
  //       );
  //     }
  //     return { success: true, meme: input.id };
  //   }),
});
