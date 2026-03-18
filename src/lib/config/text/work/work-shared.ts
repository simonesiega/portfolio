import type {WorkText} from "./types";

export const workHero = {
  sectionId: "work-heading",
  eyebrow: "WORK",
  title: "Professional Experience",
  subtitle: "Internships and professional roles across real-world software projects.",
} as const satisfies WorkText["hero"];

export const workSections = {
  experienceAriaLabel: "Selected experience",
  technologiesAriaLabel: "Technologies used",
} as const satisfies WorkText["sections"];

export const workFooter = {
  legalDisclaimerLine: "Logos and trademarks are the property of their respective owners.",
} as const satisfies WorkText["footer"];
