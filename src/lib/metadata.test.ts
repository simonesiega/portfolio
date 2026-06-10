import {describe, expect, it} from "vitest";
import {appConfig} from "@/lib/config/app-config";
import {createContentPageMetadata, sharedOpenGraph, sharedTwitter} from "./metadata";

describe("metadata helpers", () => {
  it("builds canonical, OpenGraph, and Twitter metadata for content pages", () => {
    const metadata = createContentPageMetadata({
      route: "/projects",
      title: "Projects",
      description: "Selected project work.",
    });
    const expectedSocialTitle = `Projects | ${appConfig.owner.name}`;

    expect(metadata.title).toBe("Projects");
    expect(metadata.description).toBe("Selected project work.");
    expect(metadata.alternates?.canonical).toBe("/projects");
    expect(metadata.openGraph).toMatchObject({
      ...sharedOpenGraph,
      url: "/projects",
      title: expectedSocialTitle,
      description: "Selected project work.",
    });
    expect(metadata.twitter).toMatchObject({
      ...sharedTwitter,
      title: expectedSocialTitle,
      description: "Selected project work.",
    });
  });
});
