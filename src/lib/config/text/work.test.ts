import {describe, expect, it} from "vitest";
import {workText} from "./work";

const sortStartPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

describe("work text model", () => {
  it("keeps shared page copy complete", () => {
    expect(workText.hero.sectionId.trim().length).toBeGreaterThan(0);
    expect(workText.hero.eyebrow.trim().length).toBeGreaterThan(0);
    expect(workText.hero.title.trim().length).toBeGreaterThan(0);
    expect(workText.hero.subtitle.trim().length).toBeGreaterThan(0);

    expect(workText.sections.experienceAriaLabel.trim().length).toBeGreaterThan(0);
    expect(workText.sections.technologiesAriaLabel.trim().length).toBeGreaterThan(0);

    expect(workText.footer.legalDisclaimerLine.trim().length).toBeGreaterThan(0);
  });

  it("enforces experience structure, uniqueness, and content quality", () => {
    const experienceIds = new Set<string>();

    expect(workText.experiences.length).toBeGreaterThan(0);

    for (const experience of workText.experiences) {
      expect(experience.id.trim().length).toBeGreaterThan(0);
      expect(experience.sortStart).toMatch(sortStartPattern);
      expect(experience.logoSrc.trim().length).toBeGreaterThan(0);
      expect(experience.logoSrc.startsWith("/work/logos/")).toBe(true);
      expect(experience.logoAlt.trim().length).toBeGreaterThan(0);
      expect(experience.dateRange.trim().length).toBeGreaterThan(0);
      expect(experience.role.trim().length).toBeGreaterThan(0);
      expect(experience.company.trim().length).toBeGreaterThan(0);
      expect(experience.companyType.trim().length).toBeGreaterThan(0);
      expect(experience.location.trim().length).toBeGreaterThan(0);
      expect(experience.description.trim().length).toBeGreaterThan(0);

      expect(experienceIds.has(experience.id), `Duplicate experience id: ${experience.id}`).toBe(
        false
      );
      experienceIds.add(experience.id);

      expect(experience.technologies.length).toBeGreaterThan(0);
      expect(new Set(experience.technologies).size).toBe(experience.technologies.length);

      for (const technology of experience.technologies) {
        expect(technology.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps experiences ordered from newest to oldest by sortStart", () => {
    for (let index = 1; index < workText.experiences.length; index += 1) {
      const previous = workText.experiences[index - 1];
      const current = workText.experiences[index];

      expect(previous.sortStart >= current.sortStart).toBe(true);
    }
  });
});
