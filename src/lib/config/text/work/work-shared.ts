import type {WorkText} from "./types";

export const workHero = {
  sectionId: "work-heading",
  title: "Selected Work",
  subtitle: "Client projects, internships, and production delivery experience.",
} as const satisfies WorkText["hero"];

export const workSections = {
  experienceAriaLabel: "Selected experience",
  tagsAriaLabel: "Experience tags",
} as const satisfies WorkText["sections"];

export const workFooter = {
  legalDisclaimerLine: "Logos and trademarks are the property of their respective owners.",
} as const satisfies WorkText["footer"];
