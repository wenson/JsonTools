import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Cloudflare Pages 配置
  output: "export", // 静态导出模式
  images: {
    unoptimized: true, // Cloudflare Pages 不支持 Next.js 图片优化
  },
  
  // 可选：如果有 trailing slash 需求
  // trailingSlash: true,
};

export default nextConfig;
