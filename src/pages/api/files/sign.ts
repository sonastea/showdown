import { NextApiRequest, NextApiResponse } from "next";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const sign = async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = await cloudinary.utils.api_sign_request({
    timestamp: timestamp,
  });

  return res.json({ timestamp, signature });
};

export default sign;
