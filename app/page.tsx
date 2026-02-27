import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";

const SOCIAL_LINKS = {
  github: "https://github.com/simonesiega",
  linkedin: "https://linkedin.com/in/simonesiega",
} as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ui-bg)] text-[var(--ui-fg)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <SiteHeader
          ownerName="Simone Siega"
          githubUrl={SOCIAL_LINKS.github}
          linkedinUrl={SOCIAL_LINKS.linkedin}
        />

        <div className="mt-auto flex justify-end pb-8 sm:pb-10">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
