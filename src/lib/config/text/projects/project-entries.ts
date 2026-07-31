import {cfgParserProject} from "./entries/cfg-parser";
import {codexLimitsProject} from "./entries/codex-limits";
import {europeanTechOpportunities2027Project} from "./entries/european-tech-opportunities-2027";
import {firstClientProjects} from "./entries/first-client-projects";

const projectEntries = [
  firstClientProjects,
  europeanTechOpportunities2027Project,
  codexLimitsProject,
  cfgParserProject,
] as const;

export const projects = projectEntries.toSorted((firstProject, secondProject) => {
  if (firstProject.pinned !== secondProject.pinned) {
    return firstProject.pinned ? -1 : 1;
  }

  return secondProject.developmentPeriod.localeCompare(firstProject.developmentPeriod, undefined, {
    numeric: true,
  });
});
