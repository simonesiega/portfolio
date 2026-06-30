import path from "node:path";
import createMDX from "@next/mdx";
import type {NextConfig} from "next";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/*": ["./node_modules/@img/sharp-*/lib/*"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 100],
  },
};

export default withMDX(nextConfig);
