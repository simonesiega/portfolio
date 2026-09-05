import {describe, expect, it} from "vitest";
import {appConfig} from "./app-config";
import {appRoutes, contentPageSeo} from "./site-routes";
import {projectsText} from "./text/projects";
import {workText} from "./text/work";

describe("site routes config", () => {
  it("derives public routes from the navigation and project registries", () => {
    const expectedRoutes = [
      appConfig.navigation.homeHref,
      ...appConfig.navigation.headerLinks.map((link) => link.href),
      ...projectsText.projects.map((project) => `/projects/${project.slug}`),
    ];

    expect(appRoutes).toEqual(expectedRoutes);
    expect(new Set(appRoutes).size).toBe(appRoutes.length);
  });

  it("keeps listing-page SEO aligned with its visible copy", () => {
    expect(contentPageSeo).toEqual({
      "/projects": {
        title: projectsText.seo.projectsPageTitle,
        description: projectsText.hero.subtitle,
      },
      "/work": {
        title: "Work",
        description: workText.hero.subtitle,
      },
    });

    for (const [route, seo] of Object.entries(contentPageSeo)) {
      expect(appRoutes).toContain(route);
      expect(seo.title.trim().length).toBeGreaterThan(0);
      expect(seo.description.trim().length).toBeGreaterThan(0);
    }
  });
});
