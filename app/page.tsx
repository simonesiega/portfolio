import { SiteHeader } from "@/components/site-header";

const SOCIAL_LINKS = {
  github: "https://github.com/simonesiega",
  linkedin: "https://linkedin.com/in/simonesiega",
} as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <SiteHeader
          ownerName="Simone Siega"
          githubUrl={SOCIAL_LINKS.github}
          linkedinUrl={SOCIAL_LINKS.linkedin}
        />
      </div>
    </main>
  );
}
