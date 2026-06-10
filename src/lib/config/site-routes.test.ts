import {describe, expect, it} from "vitest";
import {appRouteFiles, appRouteLastModified, contentPageSeo} from "./site-routes";
import {projectsText} from "./text/projects";

describe("site routes config", () => {
  it("keeps static, project, and SEO route config aligned", () => {
    expect(appRouteFiles["/"]).toBe("src/app/page.tsx");
    expect(appRouteFiles["/projects"]).toBe("src/app/projects/page.tsx");
    expect(appRouteFiles["/work"]).toBe("src/app/work/page.tsx");
    expect(contentPageSeo["/projects"].description).toBe(projectsText.hero.subtitle);

    const appRouteEntries = Object.entries(appRouteFiles);

    for (const project of projectsText.projects) {
      expect(appRouteEntries).toContainEqual([
        `/projects/${project.slug}`,
        "src/app/projects/[projectSlug]/page.tsx",
      ]);
    }
  });

  it("keeps every route and SEO entry internally consistent", () => {
    expect(Object.keys(appRouteLastModified).sort()).toEqual(Object.keys(appRouteFiles).sort());

    for (const [route, lastModified] of Object.entries(appRouteLastModified)) {
      expect(route.startsWith("/")).toBe(true);
      expect(Number.isNaN(Date.parse(lastModified))).toBe(false);
      expect(new Date(lastModified).toISOString()).toBe(lastModified);
    }

    for (const [route, seo] of Object.entries(contentPageSeo)) {
      expect(route in appRouteFiles).toBe(true);
      expect(seo.title.trim().length).toBeGreaterThan(0);
      expect(seo.description.trim().length).toBeGreaterThan(0);
    }
  });
});
