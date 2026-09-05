import {readdirSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, it} from "vitest";
import {
  getProjectBySlug,
  getProjectCaseStudyHref,
  projectsText,
  type ProjectsPageProject,
} from "./projects";

const projects = projectsText.projects as readonly ProjectsPageProject[];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function expectSecureUrl(value: string, label: string) {
  const url = new URL(value);

  expect(url.protocol, label).toBe("https:");
  expect(url.username, label).toBe("");
  expect(url.password, label).toBe("");
}

describe("projects text model", () => {
  it("keeps shared page copy complete", () => {
    const copy = [
      projectsText.hero.sectionId,
      projectsText.hero.title,
      projectsText.hero.subtitle,
      ...Object.values(projectsText.sections),
      ...Object.values(projectsText.seo),
      ...Object.values(projectsText.caseStudyPage),
    ];

    for (const value of copy) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it("registers every project entry and case-study file", () => {
    const projectSlugs = projects.map((project) => project.slug).sort();
    const entryDirectory = fileURLToPath(new URL("./projects/entries/", import.meta.url));
    const contentDirectory = fileURLToPath(new URL("./projects/content/", import.meta.url));
    const entrySlugs = readdirSync(entryDirectory)
      .filter((fileName) => path.extname(fileName) === ".ts")
      .map((fileName) => path.basename(fileName, ".ts"))
      .sort();
    const contentSlugs = readdirSync(contentDirectory)
      .filter((fileName) => path.extname(fileName) === ".mdx")
      .map((fileName) => path.basename(fileName, ".mdx"))
      .sort();

    expect(entrySlugs).toEqual(projectSlugs);
    expect(contentSlugs).toEqual(projectSlugs);
  });

  it("keeps project identity, routes, links, and SEO valid", () => {
    const projectSlugs = new Set<string>();
    const projectTitles = new Set<string>();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects.some((project) => project.showOnLandingPage)).toBe(true);

    for (const project of projects) {
      expect(project.slug).toMatch(slugPattern);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.developmentPeriod.trim().length).toBeGreaterThan(0);
      expect(project.keyPhrase.trim().length).toBeGreaterThan(0);
      expect(projectSlugs.has(project.slug), `Duplicate project slug: ${project.slug}`).toBe(false);
      expect(projectTitles.has(project.title), `Duplicate project title: ${project.title}`).toBe(
        false
      );
      projectSlugs.add(project.slug);
      projectTitles.add(project.title);

      if (project.showOnLandingPage) {
        expect(project.landingPageDescription.trim().length).toBeGreaterThan(0);
      }

      if (project.githubUrl) {
        expectSecureUrl(project.githubUrl, `${project.slug}.githubUrl`);
      }

      if (project.demoUrls) {
        expect(project.demoUrls.length).toBeGreaterThan(0);
        expect(new Set(project.demoUrls.map((demo) => demo.href)).size).toBe(
          project.demoUrls.length
        );

        for (const demo of project.demoUrls) {
          expect(demo.label.trim().length).toBeGreaterThan(0);
          expectSecureUrl(demo.href, `${project.slug}.demoUrls`);
        }
      }

      if (project.showcaseAction) {
        expect(project.showcaseAction.label.trim().length).toBeGreaterThan(0);

        if (project.showcaseAction.kind === "external") {
          expectSecureUrl(project.showcaseAction.href, `${project.slug}.showcaseAction`);
        }
      }

      expect(getProjectBySlug(project.slug)).toBe(project);
      expect(getProjectCaseStudyHref(project.slug)).toBe(`/projects/${project.slug}`);
    }

    expect(getProjectBySlug("unknown-project-slug")).toBeUndefined();
  });

  it("enforces complete case-study summaries, media, and MDX content", () => {
    for (const project of projects) {
      const {caseStudy} = project;

      expect(Number.isInteger(caseStudy.readTimeMinutes)).toBe(true);
      expect(caseStudy.readTimeMinutes).toBeGreaterThan(0);
      expect(caseStudy.quickFacts.length).toBeGreaterThan(0);
      expect(typeof caseStudy.Content).toBe("function");

      const quickFactLabels = new Set<string>();
      for (const quickFact of caseStudy.quickFacts) {
        expect(quickFact.label.trim().length).toBeGreaterThan(0);
        expect(quickFact.value.trim().length).toBeGreaterThan(0);
        expect(
          quickFactLabels.has(quickFact.label),
          `Duplicate quick fact label in ${project.slug}: ${quickFact.label}`
        ).toBe(false);
        quickFactLabels.add(quickFact.label);
      }

      if (!caseStudy.gallery) {
        continue;
      }

      expect(caseStudy.gallery.length).toBeGreaterThan(0);
      const gallerySources = new Set<string>();
      const galleryCaptions = new Set<string>();

      for (const image of caseStudy.gallery) {
        expect(image.src).toMatch(/^\/[^/]/);
        expect(image.alt.trim().length).toBeGreaterThan(0);
        expect(image.caption?.trim().length).toBeGreaterThan(0);
        expect(
          gallerySources.has(image.src),
          `Duplicate gallery image in ${project.slug}: ${image.src}`
        ).toBe(false);
        gallerySources.add(image.src);

        if (image.caption) {
          expect(
            galleryCaptions.has(image.caption),
            `Duplicate gallery caption in ${project.slug}: ${image.caption}`
          ).toBe(false);
          galleryCaptions.add(image.caption);
        }

        if (image.thumbnailDescription !== undefined) {
          expect(image.thumbnailDescription.trim().length).toBeGreaterThan(0);
        }

        if (image.href) {
          expectSecureUrl(image.href, `${project.slug}.gallery.href`);
        }
      }
    }
  });

  it("orders featured projects first and the remaining projects newest first", () => {
    const expectedOrder = [...projects].sort((first, second) => {
      if (first.pinned !== second.pinned) {
        return first.pinned ? -1 : 1;
      }

      return second.developmentPeriod.localeCompare(first.developmentPeriod, undefined, {
        numeric: true,
      });
    });

    expect(projects.map((project) => project.slug)).toEqual(
      expectedOrder.map((project) => project.slug)
    );
  });
});
