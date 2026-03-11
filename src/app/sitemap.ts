import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { getSiteOrigin } from "@/lib/site-url";

const baseUrl = getSiteOrigin();

const routeFiles = {
  "/": "src/app/page.tsx",
  "/projects": "src/app/projects/page.tsx",
  "/work": "src/app/work/page.tsx",
} as const;

const gitLogEntrySeparator = "__SITEMAP_COMMIT__";

function getLastModifiedByFile(filePaths: readonly string[]) {
  const lastModifiedByFile = new Map<string, string>();
  const trackedFiles = new Set(filePaths);

  try {
    const output = execFileSync(
      "git",
      [
        "log",
        `--format=${gitLogEntrySeparator}%n%cI`,
        "--name-only",
        "--",
        ...filePaths,
      ],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    );

    const entries = output.split(gitLogEntrySeparator).slice(1);

    for (const entry of entries) {
      const lines = entry
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      const [rawDate, ...rawFiles] = lines;

      if (!rawDate) {
        continue;
      }

      for (const filePath of rawFiles) {
        const normalizedFilePath = filePath.trim();

        if (
          !normalizedFilePath ||
          !trackedFiles.has(normalizedFilePath) ||
          lastModifiedByFile.has(normalizedFilePath)
        ) {
          continue;
        }

        lastModifiedByFile.set(normalizedFilePath, rawDate);
      }
    }
  } catch {
    return new Map<string, string>();
  }

  return lastModifiedByFile;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModifiedByFile = getLastModifiedByFile(Object.values(routeFiles));

  return Object.entries(routeFiles).map(([route, filePath]) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedByFile.get(filePath),
  }));
}
