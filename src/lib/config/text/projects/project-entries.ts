import {cfgParserProject} from "./entries/cfg-parser";

const projectEntries = [cfgParserProject] as const;

export const projects = projectEntries.toSorted((firstProject, secondProject) => {
  if (firstProject.pinned === secondProject.pinned) {
    return 0;
  }

  return firstProject.pinned ? -1 : 1;
});
