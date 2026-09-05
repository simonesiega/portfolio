import {readdirSync, statSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, it} from "vitest";
import sharp from "sharp";
import {appConfig} from "./app-config";
import {homeText} from "./text/home";
import {projectsText} from "./text/projects";
import {workText} from "./text/work";

const publicDirectory = fileURLToPath(new URL("../../../public/", import.meta.url));

function listPublicFiles(directory = publicDirectory, prefix = ""): string[] {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

    return entry.isDirectory()
      ? listPublicFiles(path.join(directory, entry.name), relativePath)
      : [`/${relativePath}`];
  });
}

describe("public assets", () => {
  it("keeps every configured asset present and every public file in use", () => {
    const configuredAssets = new Set<string>([
      appConfig.metadata.iconPath,
      homeText.intro.profileImage.src,
      ...homeText.intro.socialLinks.map((link) => link.href).filter((href) => href.startsWith("/")),
      ...homeText.intro.about.images.map((image) => image.src),
      ...homeText.intro.works.items.map((work) => work.imageSrc),
      ...projectsText.projects.flatMap(
        (project) => project.caseStudy.gallery?.map((image) => image.src) ?? []
      ),
      ...workText.experiences.flatMap((experience) =>
        experience.logoSrc ? [experience.logoSrc] : []
      ),
    ]);
    const publicFiles = listPublicFiles().sort();

    for (const assetPath of configuredAssets) {
      expect(assetPath).toMatch(/^\/(?!\/)/);
      expect(publicFiles, `Missing public asset: ${assetPath}`).toContain(assetPath);
      expect(statSync(path.join(publicDirectory, assetPath.slice(1))).size).toBeGreaterThan(0);
    }

    expect(publicFiles).toEqual([...configuredAssets].sort());
  });

  it("keeps every image asset decodable with valid dimensions", async () => {
    const imageAssets = listPublicFiles().filter((assetPath) => /\.(?:svg|webp)$/.test(assetPath));

    expect(imageAssets.length).toBeGreaterThan(0);

    for (const assetPath of imageAssets) {
      const metadata = await sharp(path.join(publicDirectory, assetPath.slice(1))).metadata();
      expect(metadata.width, assetPath).toBeGreaterThan(0);
      expect(metadata.height, assetPath).toBeGreaterThan(0);
    }
  });
});
