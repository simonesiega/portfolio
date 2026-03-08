import type { Metadata } from "next";
import { ContactSection } from "@/components/home/contact-section";
import { CurrentlyBuildingSection } from "@/components/home/currently-building-section";
import { HomeHeroSection } from "@/components/home/hero-section";
import { RouteReveal } from "@/components/animation/route-reveal";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { PrimaryFooter } from "@/components/layout/primary-footer";
import { animationTimings } from "@/lib/animation/animation-timings";
import { appConfig } from "@/lib/config/app-config";
import { homeText } from "@/lib/config/text/home";

const { social, contact } = appConfig;
const { hero, currentlyBuilding, contactSection } = homeText;
const { homePage, routeReveal } = animationTimings;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
        <HomeHeroSection hero={hero} contactSectionId={contactSection.id} />
        <CurrentlyBuildingSection currentlyBuilding={currentlyBuilding} />

        <ScrollReveal variant="fade-in" duration={homePage.divider.durationMs}>
          <div className="mx-auto max-w-4xl pt-8 sm:pt-12">
            <hr className="border-[var(--card-border)]" />
          </div>
        </ScrollReveal>

        <ContactSection
          contactSection={contactSection}
          email={contact.email}
          githubUrl={social.githubUrl}
          linkedinUrl={social.linkedinUrl}
          socialLabels={social.labels}
        />

        <RouteReveal
          variant="fade-in"
          duration={routeReveal.durationMs}
          threshold={routeReveal.threshold}
        >
          <PrimaryFooter />
        </RouteReveal>
      </div>
    </div>
  );
}
