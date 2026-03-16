import {describe, expect, it} from "vitest";
import {getProjectCaseStudyDiagramSrc, getProjectCaseStudyHref, projectsText} from "./projects";

describe("projects case study links model", () => {
  it("keeps project identity unique and routable", () => {
    const projectSlugs = new Set<string>();
    const projectIds = new Set<string>();

    for (const project of projectsText.projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);
      expect(project.slug.trim().length).toBeGreaterThan(0);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(() => new URL(project.githubUrl)).not.toThrow();

      expect(projectIds.has(project.id)).toBe(false);
      expect(projectSlugs.has(project.slug)).toBe(false);
      expect(getProjectCaseStudyHref(project.slug)).toBe(`/projects/${project.slug}`);
      expect(getProjectCaseStudyDiagramSrc(project.slug)).toBe(
        `/projects/${project.slug}/diagram.svg`
      );

      projectIds.add(project.id);
      projectSlugs.add(project.slug);
    }
  });

  it("enforces a scalable case-study section contract", () => {
    for (const project of projectsText.projects) {
      expect(project.caseStudy.sections.length).toBeGreaterThan(0);

      const sectionIds = new Set<string>();
      let linksSectionsCount = 0;

      for (const section of project.caseStudy.sections) {
        expect(section.id.trim().length).toBeGreaterThan(0);
        expect(section.heading.trim().length).toBeGreaterThan(0);
        expect(section.content.trim().length).toBeGreaterThan(0);
        expect(sectionIds.has(section.id)).toBe(false);
        sectionIds.add(section.id);

        if (section.kind === "content") {
          if ("points" in section && section.points) {
            expect(section.points.length).toBeGreaterThan(0);

            for (const point of section.points) {
              expect(point.trim().length).toBeGreaterThan(0);
            }
          }
        } else {
          linksSectionsCount += 1;
          expect(section.links.length).toBeGreaterThan(0);

          for (const link of section.links) {
            expect(link.label.trim().length).toBeGreaterThan(0);
            expect(() => new URL(link.url)).not.toThrow();
          }
        }
      }

      expect(linksSectionsCount).toBe(1);
    }
  });
});
