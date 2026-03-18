import {workExperiences} from "./work/work-entries";
import {workFooter, workHero, workSections} from "./work/work-shared";
import type {WorkText} from "./work/types";
export type {WorkPageExperience} from "./work/types";

export const workText = {
  hero: workHero,
  sections: workSections,
  footer: workFooter,
  experiences: workExperiences,
} as const satisfies WorkText;
