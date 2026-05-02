import {describe, expect, it} from "vitest";
import {
  getProjectBySlug,
  getProjectCaseStudyDiagramSrc,
  getProjectCaseStudyDiagramThemeClass,
  getProjectCaseStudyHref,
  getProjectCaseStudySeo,
  projectsText,
} from "./projects";

const expectedCaseStudySectionOrder = [
  "overview",
  "goal",
  "technical-approach",
  "architecture",
  "key-decisions",
  "challenges",
  "proof",
  "what-i-learned",
  "future-improvements",
  "links",
] as const;

describe("projects text model", () => {
  it("keeps shared page copy complete", () => {
    expect(projectsText.hero.sectionId.trim().length).toBeGreaterThan(0);
    expect(projectsText.hero.eyebrow.trim().length).toBeGreaterThan(0);
    expect(projectsText.hero.title.trim().length).toBeGreaterThan(0);
    expect(projectsText.hero.subtitle.trim().length).toBeGreaterThan(0);

    expect(projectsText.sections.projectsAriaLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.technologiesAriaLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.openCaseStudyLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.statusLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.mailSubjectPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.mailAriaLabelPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.githubAriaLabelPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.githubAriaLabelSuffix.trim().length).toBeGreaterThan(0);

    expect(projectsText.seo.projectsPageTitle.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyTitleSuffix.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyFallbackTitle.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyFallbackDescription.trim().length).toBeGreaterThan(0);

    expect(projectsText.caseStudyPage.eyebrow.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.minReadSuffix.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.backToProjectsLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.githubLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.demoLabel.trim().length).toBeGreaterThan(0);
  });

  it("keeps project identity unique and helper lookups aligned", () => {
    const projectIds = new Set<string>();
    const projectSlugs = new Set<string>();

    expect(projectsText.projects.length).toBeGreaterThan(0);

    for (const project of projectsText.projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);
      expect(project.slug.trim().length).toBeGreaterThan(0);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.status.trim().length).toBeGreaterThan(0);
      expect(project.developmentPeriod.trim().length).toBeGreaterThan(0);
      expect(project.keyPhrase.trim().length).toBeGreaterThan(0);
      expect(() => new URL(project.githubUrl)).not.toThrow();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(new Set(project.technologies).size).toBe(project.technologies.length);

      expect(projectIds.has(project.id), `Duplicate project id: ${project.id}`).toBe(false);
      expect(projectSlugs.has(project.slug), `Duplicate project slug: ${project.slug}`).toBe(false);

      projectIds.add(project.id);
      projectSlugs.add(project.slug);

      expect(getProjectBySlug(project.slug)?.id).toBe(project.id);
      expect(getProjectCaseStudyHref(project.slug)).toBe(`/projects/${project.slug}`);
      expect(getProjectCaseStudyDiagramSrc(project.slug)).toBe(
        `/projects/${project.slug}/diagram.svg`
      );

      const seo = getProjectCaseStudySeo(project.slug);

      expect(seo.title).toBe(`${project.title} ${projectsText.seo.caseStudyTitleSuffix}`);
      expect(seo.description).toBe(project.caseStudy.summary);

      if (project.caseStudy.diagramRenderingMode === "dark-source") {
        expect(getProjectCaseStudyDiagramThemeClass(project.slug)).toBe(
          "project-diagram-image--dark-source"
        );
      } else {
        expect(getProjectCaseStudyDiagramThemeClass(project.slug)).toBe("");
      }
    }

    const unknownSlug = "unknown-project-slug";
    const fallbackSeo = getProjectCaseStudySeo(unknownSlug);

    expect(getProjectBySlug(unknownSlug)).toBeUndefined();
    expect(getProjectCaseStudyDiagramThemeClass(unknownSlug)).toBe("");
    expect(fallbackSeo.title).toBe(projectsText.seo.caseStudyFallbackTitle);
    expect(fallbackSeo.description).toBe(projectsText.seo.caseStudyFallbackDescription);
  });

  it("enforces full case-study structure, order, and content quality", () => {
    for (const project of projectsText.projects) {
      const {caseStudy} = project;

      expect(caseStudy.summary.trim().length).toBeGreaterThan(0);
      expect(caseStudy.readTimeMinutes).toBeGreaterThan(0);
      expect(caseStudy.diagramAlt.trim().length).toBeGreaterThan(0);
      expect(caseStudy.quickFacts.length).toBeGreaterThan(0);
      expect(caseStudy.sections.length).toBe(expectedCaseStudySectionOrder.length);

      const quickFactLabels = new Set<string>();
      for (const quickFact of caseStudy.quickFacts) {
        expect(quickFact.label.trim().length).toBeGreaterThan(0);
        expect(quickFact.value.trim().length).toBeGreaterThan(0);
        expect(
          quickFactLabels.has(quickFact.label),
          `Duplicate quick fact label: ${quickFact.label}`
        ).toBe(false);
        quickFactLabels.add(quickFact.label);
      }

      const sectionIds = caseStudy.sections.map((section) => section.id);
      const uniqueSectionIds = new Set<string>();
      let linksSectionsCount = 0;

      expect(sectionIds).toEqual(expectedCaseStudySectionOrder);

      for (const section of caseStudy.sections) {
        expect(section.id.trim().length).toBeGreaterThan(0);
        expect(section.heading.trim().length).toBeGreaterThan(0);
        expect(section.content.trim().length).toBeGreaterThan(0);
        expect(uniqueSectionIds.has(section.id), `Duplicate section id: ${section.id}`).toBe(false);

        uniqueSectionIds.add(section.id);

        if (section.kind === "content") {
          if ("points" in section && section.points) {
            expect(section.points.length).toBeGreaterThan(0);

            for (const point of section.points) {
              expect(point.trim().length).toBeGreaterThan(0);
            }
          }

          if (section.id === "proof") {
            expect(
              "points" in section && section.points ? section.points.length : 0
            ).toBeGreaterThan(0);
          }
        } else {
          linksSectionsCount += 1;
          expect(section.id).toBe("links");
          expect(section.links.length).toBeGreaterThan(0);

          const linkUrls = new Set<string>();
          for (const link of section.links) {
            expect(link.title.trim().length).toBeGreaterThan(0);
            expect(link.description.trim().length).toBeGreaterThan(0);
            expect(() => new URL(link.url)).not.toThrow();
            expect(linkUrls.has(link.url), `Duplicate link url in links section: ${link.url}`).toBe(
              false
            );
            linkUrls.add(link.url);
          }
        }
      }

      expect(linksSectionsCount).toBe(1);
    }
  });
});
