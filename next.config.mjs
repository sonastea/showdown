import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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

export default withBundleAnalyzer({
  ...nextConfig,
  ...headers,
  ...redirects,
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    webpackBuildWorker: true,
  },
});
