import {FiArrowUpRight} from "react-icons/fi";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";
import {montserrat} from "@/lib/fonts";
import type {HomeCurrentlyBuilding} from "@/lib/config/text/home";

type CurrentlyBuildingSectionProps = {
  currentlyBuilding: HomeCurrentlyBuilding;
};

export function CurrentlyBuildingSection({currentlyBuilding}: CurrentlyBuildingSectionProps) {
  const {homeCurrentlyBuilding} = animationTimings;

  return (
    <section id={currentlyBuilding.id} className="pt-6 sm:pt-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal variant="fade-up">
          <h2
            className={`${montserrat.className} text-2xl font-extrabold tracking-tight sm:text-4xl`}
          >
            {currentlyBuilding.title}
          </h2>
          <p className="mt-3 text-sm text-[var(--header-item-color)] sm:text-base">
            {currentlyBuilding.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {currentlyBuilding.projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              variant="scale-up"
              delay={index * homeCurrentlyBuilding.cards.stepDelayMs}
              duration={homeCurrentlyBuilding.cards.durationMs}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={project.ariaLabel}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-sm transition duration-300 hover:scale-[1.01] hover:border-[var(--card-hover-border)] focus-visible:border-[var(--card-hover-border)] focus-visible:ring-2 focus-visible:ring-[var(--ui-fg)] focus-visible:outline-none focus-visible:ring-inset"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className={`${montserrat.className} text-lg font-bold sm:text-xl`}>
                      {project.title}
                    </h3>
                    <FiArrowUpRight className="h-4 w-4 shrink-0 text-[var(--header-item-color)] opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-100" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--header-item-color)] sm:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--card-tag-bg)] px-3 py-1 text-xs font-medium text-[var(--card-tag-color)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
