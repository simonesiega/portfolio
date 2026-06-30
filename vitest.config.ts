import mdx from "@mdx-js/rollup";
import {defineConfig} from "vitest/config";
import {fileURLToPath} from "node:url";

export default defineConfig({
  plugins: [mdx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
