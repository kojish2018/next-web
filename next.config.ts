import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
    domains: ["qiitaimgkoji.s3.ap-northeast-1.amazonaws.com"],
  },
};

export default nextConfig;
