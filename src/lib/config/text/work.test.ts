import {readdirSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, it} from "vitest";
import {workText} from "./work";

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sortStartPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

function expectSecureUrl(value: string, label: string) {
  const url = new URL(value);

  expect(url.protocol, label).toBe("https:");
  expect(url.username, label).toBe("");
  expect(url.password, label).toBe("");
}

describe("work text model", () => {
  it("keeps shared page copy complete", () => {
    const copy = [
      ...Object.values(workText.hero),
      ...Object.values(workText.sections),
      ...Object.values(workText.footer),
    ];

    for (const value of copy) {
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it("registers every work entry", () => {
    const entryDirectory = fileURLToPath(new URL("./work/entries/", import.meta.url));
    const entryIds = readdirSync(entryDirectory)
      .filter((fileName) => path.extname(fileName) === ".ts")
      .map((fileName) => path.basename(fileName, ".ts"))
      .sort();
    const experienceIds = workText.experiences.map((experience) => experience.id).sort();

    expect(entryIds).toEqual(experienceIds);
  });

  it("enforces experience structure, uniqueness, links, and landing-page data", () => {
    const experienceIds = new Set<string>();
    const companyNames = new Set<string>();

    expect(workText.experiences.length).toBeGreaterThan(0);

    for (const experience of workText.experiences) {
      expect(experience.id).toMatch(idPattern);
      expect(experience.sortStart).toMatch(sortStartPattern);
      expect(experience.dateRange.trim().length).toBeGreaterThan(0);
      expect(experience.role.trim().length).toBeGreaterThan(0);
      expect(experience.company.trim().length).toBeGreaterThan(0);
      expect(experience.location.trim().length).toBeGreaterThan(0);
      expect(experience.description.trim().length).toBeGreaterThan(0);
      expect(experienceIds.has(experience.id), `Duplicate experience id: ${experience.id}`).toBe(
        false
      );
      expect(
        companyNames.has(experience.company),
        `Duplicate company name: ${experience.company}`
      ).toBe(false);
      experienceIds.add(experience.id);
      companyNames.add(experience.company);

      if (experience.logoSrc) {
        expect(experience.logoSrc).toMatch(/^\/[^/]/);
      }

      if (experience.showOnLandingPage) {
        expect(experience.landingPageDescription.trim().length).toBeGreaterThan(0);
        expect(experience.logoSrc.trim().length).toBeGreaterThan(0);
      }

      expect(experience.tags.length).toBeGreaterThan(0);
      expect(new Set(experience.tags.map((tag) => tag.label)).size).toBe(experience.tags.length);

      for (const tag of experience.tags) {
        expect(tag.label.trim().length).toBeGreaterThan(0);

        if ("href" in tag && tag.href) {
          expectSecureUrl(tag.href, `${experience.id}.tags.href`);
        }
      }
    }
  });

  it("orders experiences from newest to oldest", () => {
    const expectedOrder = [...workText.experiences].sort((first, second) =>
      second.sortStart.localeCompare(first.sortStart)
    );

    expect(workText.experiences.map((experience) => experience.id)).toEqual(
      expectedOrder.map((experience) => experience.id)
    );
  });
});
