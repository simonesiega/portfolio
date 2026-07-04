import {describe, expect, it} from "vitest";
import {appRouteFiles} from "@/lib/config/site-routes";
import {projectsText} from "./projects";
import {homeIntroSocialIconKeys, homeText} from "./home";

const yearPattern = /^\d{4}$/;

function expectAbsoluteUrl(url: string) {
  expect(() => new URL(url)).not.toThrow();
}

describe("home text model", () => {
  it("keeps social and education links valid", () => {
    const socialIcons = new Set<string>();

    expect(homeText.intro.socialLinks.length).toBe(homeIntroSocialIconKeys.length);

    for (const link of homeText.intro.socialLinks) {
      expect(homeIntroSocialIconKeys).toContain(link.icon);
      expect(link.label.trim().length).toBeGreaterThan(0);
      expectAbsoluteUrl(link.href);
      expect(socialIcons.has(link.icon), `Duplicate social icon: ${link.icon}`).toBe(false);
      socialIcons.add(link.icon);
    }

    for (const item of homeText.intro.education.items) {
      expect(item.school.trim().length).toBeGreaterThan(0);
      expect(item.description.trim().length).toBeGreaterThan(0);
      expectAbsoluteUrl(item.href);
    }
  });

  it("keeps featured project and work routes aligned with app routes", () => {
    const projectHrefs = new Set(
      projectsText.projects.map((project) => `/projects/${project.slug}`)
    );

    expect(homeText.intro.projects.seeAllHref in appRouteFiles).toBe(true);
    expect(homeText.intro.works.seeAllHref in appRouteFiles).toBe(true);

    for (const project of homeText.intro.projects.items) {
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(projectHrefs.has(project.href)).toBe(true);
    }
  });

  it("keeps local image references complete", () => {
    expect(homeText.intro.profileImage.src.startsWith("/")).toBe(true);
    expect(homeText.intro.profileImage.alt.trim().length).toBeGreaterThan(0);

    for (const work of homeText.intro.works.items) {
      expect(work.title.trim().length).toBeGreaterThan(0);
      expect(work.description.trim().length).toBeGreaterThan(0);
      expect(work.dateRange).toMatch(yearPattern);
      expect(work.imageSrc.startsWith("/")).toBe(true);
      expect(work.imageAlt.trim().length).toBeGreaterThan(0);
    }

    for (const image of homeText.intro.about.images) {
      expect(image.label.trim().length).toBeGreaterThan(0);
      expect(image.src.startsWith("/")).toBe(true);
      expect(image.alt.trim().length).toBeGreaterThan(0);
    }
  });
});
