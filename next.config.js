/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  reactStrictMode: true,
};

const headers = async () => {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        },
        {
          key: "Access-Control-Allow-Headers",
          value:
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      ],
    },
  ];
};

const redirects = async () => {
  return [
    {
      source: "/results/All",
      destination: "/results",
      permanent: false,
    },
  ];
};

module.exports = withPlausibleProxy()({
  nextConfig,
  headers,
  redirects,
  images: {
    domains: ["res.cloudinary.com"],
  },
});
