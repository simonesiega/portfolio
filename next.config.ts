import path from "node:path";
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
