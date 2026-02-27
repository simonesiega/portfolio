import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const SOCIAL_LINKS = {
  github: "https://github.com/simonesiega",
  linkedin: "https://linkedin.com/in/simonesiega",
} as const;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ui-bg)] text-[var(--ui-fg)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[90rem] flex-col px-4 sm:px-8">
        <SiteHeader
          ownerName="Simone Siega"
          githubUrl={SOCIAL_LINKS.github}
          linkedinUrl={SOCIAL_LINKS.linkedin}
        />

        <section className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-4xl translate-x-2 sm:translate-x-4">
            <div className="flex items-center gap-5 sm:gap-7">
              <Image
                src="/profile_placeholder.jpg"
                alt="Simone Siega profile"
                width={96}
                height={96}
                priority
                className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
              />

              <div className={montserrat.className}>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Hi, I am Simone Siega
                </h1>
                <p className="mt-2 text-base text-[var(--header-item-color)] sm:text-lg">
                  📍 Venice, Italy · Computer Science student (’26)
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-[var(--header-item-color)] sm:text-lg">
              <p>
                Computer Science student (’26) focused on AI and machine learning, building practical, well-structured software 
                projects that bring intelligent capabilities into real-world applications, including LLM-based solutions and AI-driven 
                features.
              </p>

              <p>
                Strong background in Java through academic and personal projects, complemented by systems-level development in Rust and Android 
                application development with Flutter.
              </p>

              <p>
                Full-stack web development with React/Next.js and TypeScript, using PHP and Python to build backend services, 
                REST APIs, database-driven applications, and to prototype AI/ML workflows.
              </p>
            </div>

            <div className="mt-10">
              <h2 className={`${montserrat.className} text-2xl font-bold sm:text-3xl`}>
                Top skills
              </h2>
                <p className="mt-3 max-w-3xl text-[var(--header-item-color)] sm:text-lg">
                  AI & Machine Learning · Java · React/Next.js · REST APIs · Database Systems · Rust · Flutter
                </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end pb-8 sm:pb-10">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
