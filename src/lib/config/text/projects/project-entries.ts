import {cfgParserProject} from "./entries/cfg-parser";
import {codexLimitsProject} from "./entries/codex-limits";
import {firstClientProjects} from "./entries/first-client-projects";

const projectEntries = [cfgParserProject, codexLimitsProject, firstClientProjects] as const;

export const projects = projectEntries.toSorted((firstProject, secondProject) => {
  if (firstProject.pinned !== secondProject.pinned) {
    return firstProject.pinned ? -1 : 1;
  }

  return secondProject.developmentPeriod.localeCompare(firstProject.developmentPeriod, undefined, {
    numeric: true,
  });
});
