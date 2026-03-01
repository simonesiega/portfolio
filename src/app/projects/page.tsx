import { ScrollReveal } from "@/components/animation/scroll-reveal";

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-4 sm:px-8">
      <main className="flex flex-1 items-center py-16 sm:py-24">
        <section className="w-full max-w-3xl">
          <ScrollReveal variant="fade-in" duration={600}>
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--header-item-color)] uppercase sm:text-sm">
              Projects Section
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120} duration={760}>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={220} duration={820}>
            <p className="mt-4 max-w-2xl text-base text-[var(--ui-fg-muted)] sm:text-lg">
              Projects paragraph
            </p>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}
