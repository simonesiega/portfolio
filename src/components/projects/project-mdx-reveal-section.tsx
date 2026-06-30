import type {ReactNode} from "react";
import {ScrollReveal} from "@/components/animation/scroll-reveal";
import {animationTimings} from "@/lib/animation/animation-timings";

type ProjectMdxRevealSectionProps = {
  children: ReactNode;
};

export function ProjectMdxRevealSection({children}: ProjectMdxRevealSectionProps) {
  const {content} = animationTimings.projectCaseStudy;

  return (
    <ScrollReveal
      variant="fade-up"
      delay={content.delayMs}
      initialViewportDelay={content.initialViewportDelayMs}
      duration={content.durationMs}
      threshold={content.threshold}
    >
      <section>{children}</section>
    </ScrollReveal>
  );
}
