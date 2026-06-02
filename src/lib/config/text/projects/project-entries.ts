import {cfgParserProject} from "./entries/cfg-parser";
import {firstClientProjects} from "./entries/first-client-projects";

const projectEntries = [cfgParserProject, firstClientProjects] as const;

export const projects = projectEntries.toSorted((firstProject, secondProject) => {
  if (firstProject.pinned === secondProject.pinned) {
    return 0;
  }

  return firstProject.pinned ? -1 : 1;
});
