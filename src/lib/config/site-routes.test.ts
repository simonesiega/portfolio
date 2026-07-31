import {describe, expect, it} from "vitest";
import {appRouteLastModified, appRoutes, contentPageSeo} from "./site-routes";
import {projectsText} from "./text/projects";

describe("site routes config", () => {
  it("keeps static, project, and SEO route config aligned", () => {
    expect(appRoutes).toEqual(expect.arrayContaining(["/", "/projects", "/work"]));
    expect(contentPageSeo["/projects"].description).toBe(projectsText.hero.subtitle);

    for (const project of projectsText.projects) {
      expect(appRoutes).toContain(`/projects/${project.slug}`);
    }
  });

  it("keeps every route and SEO entry internally consistent", () => {
    expect(new Set(appRoutes).size).toBe(appRoutes.length);
    expect(Object.keys(appRouteLastModified).sort()).toEqual([...appRoutes].sort());

    for (const [route, lastModified] of Object.entries(appRouteLastModified)) {
      expect(route.startsWith("/")).toBe(true);
      expect(Number.isNaN(Date.parse(lastModified))).toBe(false);
      expect(new Date(lastModified).toISOString()).toBe(lastModified);
    }

    for (const [route, seo] of Object.entries(contentPageSeo)) {
      expect(appRoutes).toContain(route);
      expect(seo.title.trim().length).toBeGreaterThan(0);
      expect(seo.description.trim().length).toBeGreaterThan(0);
    }
  });
});
