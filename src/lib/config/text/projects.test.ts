import {describe, expect, it} from "vitest";
import {
  getProjectBySlug,
  getProjectCaseStudyDiagramThemeClass,
  getProjectCaseStudyHref,
  getProjectCaseStudySeo,
  projectsText,
  type ProjectsPageProject,
} from "./projects";

const projects = projectsText.projects as readonly ProjectsPageProject[];

describe("projects text model", () => {
  it("keeps shared page copy complete", () => {
    expect(projectsText.hero.sectionId.trim().length).toBeGreaterThan(0);
    expect(projectsText.hero.title.trim().length).toBeGreaterThan(0);
    expect(projectsText.hero.subtitle.trim().length).toBeGreaterThan(0);

    expect(projectsText.sections.projectsAriaLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.openCaseStudyLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.mailSubjectPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.mailAriaLabelPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.githubAriaLabelPrefix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.githubAriaLabelSuffix.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.githubLinkLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.askLinkLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.sections.pinnedLabel.trim().length).toBeGreaterThan(0);

    expect(projectsText.seo.projectsPageTitle.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyTitleSuffix.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyFallbackTitle.trim().length).toBeGreaterThan(0);
    expect(projectsText.seo.caseStudyFallbackDescription.trim().length).toBeGreaterThan(0);

    expect(projectsText.caseStudyPage.minReadSuffix.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.backToProjectsLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.githubLabel.trim().length).toBeGreaterThan(0);
    expect(projectsText.caseStudyPage.projectSummaryAriaLabel.trim().length).toBeGreaterThan(0);
  });

  it("keeps project identity unique and helper lookups aligned", () => {
    const projectIds = new Set<string>();
    const projectSlugs = new Set<string>();

    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);
      expect(project.slug.trim().length).toBeGreaterThan(0);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(typeof project.pinned).toBe("boolean");
      expect(project.developmentPeriod.trim().length).toBeGreaterThan(0);
      expect(project.keyPhrase.trim().length).toBeGreaterThan(0);
      expect(
        project.githubUrl.trim() === "" ||
          (() => {
            new URL(project.githubUrl);
            return true;
          })()
      ).toBe(true);
      if (project.demoUrls) {
        expect(project.demoUrls.length).toBeGreaterThan(0);
        expect(new Set(project.demoUrls.map((demo) => demo.href)).size).toBe(
          project.demoUrls.length
        );

        for (const demo of project.demoUrls) {
          expect(demo.label.trim().length).toBeGreaterThan(0);
          expect(() => new URL(demo.href)).not.toThrow();
        }
      }

      expect(projectIds.has(project.id), `Duplicate project id: ${project.id}`).toBe(false);
      expect(projectSlugs.has(project.slug), `Duplicate project slug: ${project.slug}`).toBe(false);

      projectIds.add(project.id);
      projectSlugs.add(project.slug);

      expect(getProjectBySlug(project.slug)?.id).toBe(project.id);
      expect(getProjectCaseStudyHref(project.slug)).toBe(`/projects/${project.slug}`);

      const seo = getProjectCaseStudySeo(project.slug);

      expect(seo.title).toBe(`${project.title} ${projectsText.seo.caseStudyTitleSuffix}`);
      expect(seo.description).toBe(project.keyPhrase);

      const renderingMode = project.caseStudy.gallery?.[0]?.renderingMode;

      if (renderingMode === "dark-source") {
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

  it("enforces complete case-study metadata and MDX content", () => {
    for (const project of projects) {
      const {caseStudy} = project;

      expect(caseStudy.readTimeMinutes).toBeGreaterThan(0);
      expect(caseStudy.quickFacts.length).toBeGreaterThan(0);
      expect(typeof caseStudy.Content).toBe("function");

      if (caseStudy.gallery) {
        expect(caseStudy.gallery.length).toBeGreaterThan(0);

        const gallerySources = new Set<string>();
        const galleryCaptions = new Set<string>();
        for (const image of caseStudy.gallery) {
          expect(image.src.trim().length).toBeGreaterThan(0);
          expect(image.alt.trim().length).toBeGreaterThan(0);
          expect(gallerySources.has(image.src), `Duplicate gallery image: ${image.src}`).toBe(
            false
          );
          gallerySources.add(image.src);

          expect(image.caption?.trim().length).toBeGreaterThan(0);

          if (image.caption) {
            expect(
              galleryCaptions.has(image.caption),
              `Duplicate gallery caption: ${image.caption}`
            ).toBe(false);
            galleryCaptions.add(image.caption);
          }

          const href = image.href;
          if (href !== undefined && href !== null) {
            expect(() => new URL(href)).not.toThrow();
          }
        }
      }

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
    }
  });

  it("keeps pinned projects before regular projects", () => {
    const firstRegularProjectIndex = projects.findIndex((project) => !project.pinned);

    if (firstRegularProjectIndex === -1) {
      return;
    }

    const pinnedProjectAfterRegular = projects
      .slice(firstRegularProjectIndex + 1)
      .find((project) => project.pinned);

    expect(pinnedProjectAfterRegular).toBeUndefined();
  });
});
