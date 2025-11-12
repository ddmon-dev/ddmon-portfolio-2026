import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  distDir: process.env.IS_CLAUDE ? '.next-claude' : undefined,
};

export default nextConfig;
