import { UploadApiResponse } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/client";

export const uploadSuccess = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data: UploadApiResponse = req.body;
  const added = await prisma.meme.create({
    data: {
      id: data.asset_id,
      name: data.public_id,
      url: data.secure_url,
    },
  });
  return res.status(200).json(added);
};

export default uploadSuccess;
