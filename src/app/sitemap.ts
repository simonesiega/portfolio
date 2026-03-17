import type {MetadataRoute} from "next";
import {execFileSync} from "node:child_process";
import {statSync} from "node:fs";
import {appRouteFiles} from "@/lib/config/site-routes";
import {getSiteOrigin} from "@/lib/site-url";

const baseUrl = getSiteOrigin();

const gitLogEntrySeparator = "__SITEMAP_COMMIT__";

function getLastModifiedByFile(filePaths: readonly string[]) {
  const lastModifiedByFile = new Map<string, string>();
  const trackedFiles = new Set(filePaths);

  try {
    const output = execFileSync(
      "git",
      ["log", `--format=${gitLogEntrySeparator}%n%cI`, "--name-only", "--", ...filePaths],
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

function getLastModifiedByFileStats(filePaths: readonly string[]) {
  const lastModifiedByFile = new Map<string, string>();

  for (const filePath of filePaths) {
    try {
      const fileStats = statSync(filePath);
      lastModifiedByFile.set(filePath, fileStats.mtime.toISOString());
    } catch {
      continue;
    }
  }

  return lastModifiedByFile;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routeFiles = Object.values(appRouteFiles);
  const lastModifiedByGit = getLastModifiedByFile(routeFiles);
  const lastModifiedByStats = getLastModifiedByFileStats(routeFiles);

  return Object.entries(appRouteFiles).map(([route, filePath]) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedByGit.get(filePath) ?? lastModifiedByStats.get(filePath),
  }));
}
