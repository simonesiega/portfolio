import {describe, expect, it} from "vitest";
import {appRouteFiles, contentPageSeo} from "./site-routes";
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
});
