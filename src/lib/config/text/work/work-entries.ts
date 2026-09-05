import {arsenaleMotoExperience} from "./entries/arsenale-moto";
import {dacosSrlExperience} from "./entries/dacos-srl";
import {newArtVanguardExperience} from "./entries/new-art-vanguard";

const workEntries = [arsenaleMotoExperience, newArtVanguardExperience, dacosSrlExperience] as const;

export const workExperiences = workEntries.toSorted((first, second) =>
  second.sortStart.localeCompare(first.sortStart)
);
