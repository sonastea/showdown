import { UploadApiResponse } from "cloudinary";
import { meme } from "drizzle/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "src/lib/drizzle";

export const uploadSuccess = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const data: UploadApiResponse = req.body;
  const added = await db.insert(meme).values({
    assetId: data.asset_id,
    name: data.public_id,
    url: data.secure_url,
  });
  return res.status(200).json(added);
};

export default uploadSuccess;
