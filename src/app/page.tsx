import { ContactSection } from "@/components/home/contact-section";
import { CurrentlyBuildingSection } from "@/components/home/currently-building-section";
import { HomeHeroSection } from "@/components/home/hero-section";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { appConfig } from "@/lib/config/app-config";
import { homeText } from "@/lib/config/text/home";

const { social, contact } = appConfig;
const { hero, currentlyBuilding, contactSection } = homeText;

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-8">
        <HomeHeroSection hero={hero} contactSectionId={contactSection.id} />
        <CurrentlyBuildingSection currentlyBuilding={currentlyBuilding} />

        <ScrollReveal variant="fade-in" duration={600}>
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

        <ScrollReveal variant="fade-in" duration={1000} threshold={0.05}>
          <Footer />
        </ScrollReveal>
      </div>
    </div>
  );
}
