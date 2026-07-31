import {dacosSrlExperience} from "./entries/dacos-srl";
import {novaideaExperience} from "./entries/novaidea";
import {arsenalemotoExperience} from "./entries/arsenalemoto";

const workEntries = [arsenalemotoExperience, novaideaExperience, dacosSrlExperience] as const;

export const workExperiences = workEntries.toSorted((first, second) =>
  second.sortStart.localeCompare(first.sortStart)
);
