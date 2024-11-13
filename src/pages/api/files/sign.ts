import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import initRateLimiter from "src/lib/init-rate-limiter";
import { rateLimiter } from "src/lib/rate-limiter";

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
if (!CLOUDINARY_API_SECRET) {
  throw new Error("The env variable CLOUDINARY_API_SECRET is not set.");
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const rate_limiter = initRateLimiter(rateLimiter);

export const sign = async (req: NextApiRequest, res: NextApiResponse) => {
  await rate_limiter(req, res);

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ?? "development",
      timestamp: timestamp,
    },
    CLOUDINARY_API_SECRET,
  );

  return res.json({ timestamp, signature });
};

export default sign;
