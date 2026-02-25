import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};




import path from 'path';
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}

export default nextConfig;
