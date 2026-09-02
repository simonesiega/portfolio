import {describe, expect, it} from "vitest";
import {appRoutes} from "@/lib/config/site-routes";
import {projectsText} from "./projects";
import {workText} from "./work";
import {homeText} from "./home";

function expectValidHref(href: string) {
  if (href.startsWith("/")) {
    expect(href.startsWith("//")).toBe(false);
    return;
  }

  expect(() => new URL(href)).not.toThrow();
}

describe("home text model", () => {
  it("keeps social and education links valid", () => {
    const socialIcons = new Set<string>();

    expect(homeText.intro.socialLinks.length).toBeGreaterThan(0);

    for (const link of homeText.intro.socialLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0);
      expectValidHref(link.href);
      expect(socialIcons.has(link.icon), `Duplicate social icon: ${link.icon}`).toBe(false);
      socialIcons.add(link.icon);
    }

    for (const item of homeText.intro.education.items) {
      expect(item.school.trim().length).toBeGreaterThan(0);
      expect(item.description.trim().length).toBeGreaterThan(0);
      expectValidHref(item.href);
    }
  });

  it("keeps landing page projects and work aligned with their visibility flags", () => {
    const projectHrefs = new Set(
      projectsText.projects.map((project) => `/projects/${project.slug}`)
    );
    const visibleProjectHrefs = projectsText.projects
      .filter((project) => project.showOnLandingPage)
      .map((project) => `/projects/${project.slug}`);
    const visibleWorkCompanies = workText.experiences
      .filter((experience) => experience.showOnLandingPage)
      .map((experience) => experience.company);

    expect(appRoutes).toContain(homeText.intro.projects.seeAllHref);
    expect(appRoutes).toContain(homeText.intro.works.seeAllHref);
    expect(homeText.intro.projects.items.map((project) => project.href)).toEqual(
      visibleProjectHrefs
    );
    expect(homeText.intro.works.items.map((experience) => experience.title)).toEqual(
      visibleWorkCompanies
    );

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
      expect(work.dateRange.trim().length).toBeGreaterThan(0);
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
