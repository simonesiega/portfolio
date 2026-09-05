import type {Metadata} from "next";
import {ParticleNetwork} from "@/components/animation/particle-network";
import {ProjectsShowcaseSection} from "@/components/projects/projects-showcase-section";
import {SecondaryPageLayout} from "@/components/secondary-page/secondary-page-layout";
import {contentPageSeo} from "@/lib/config/site-routes";
import {projectsText} from "@/lib/config/text/projects";
import {secondaryListingHero} from "@/lib/layout-classes";
import {createContentPageMetadata} from "@/lib/metadata";

export default function ProjectsPage() {
  const {hero, sections, projects} = projectsText;

  return (
    <div className="relative overflow-x-clip">
      <ParticleNetwork />

      <div className="relative z-10">
        <SecondaryPageLayout hero={{...hero, ...secondaryListingHero}}>
          <ProjectsShowcaseSection projects={projects} labels={sections} />
        </SecondaryPageLayout>
      </div>
    </div>
  );
}

const projectsSeo = contentPageSeo["/projects"];

export const metadata: Metadata = createContentPageMetadata({
  route: "/projects",
  title: projectsSeo.title,
  description: projectsSeo.description,
});
