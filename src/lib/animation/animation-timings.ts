export const animationTimings = {
  scrollRevealDefaults: {
    durationMs: 700,
    threshold: 0.15,
    reducedMotionQuery: "(prefers-reduced-motion: reduce)",
    rootMargin: "0px 0px -40px 0px",
  },

  routeReveal: {
    durationMs: 1300,
    threshold: 0.05,
  },

  secondaryPageHero: {
    eyebrow: {
      durationMs: 760,
    },
    title: {
      delayMs: 140,
      durationMs: 900,
    },
    subtitle: {
      delayMs: 260,
      durationMs: 960,
    },
  },

  workExperienceList: {
    item: {
      delayMs: 300,
      durationMs: 980,
      threshold: 0.1,
    },
  },

  projectsShowcaseList: {
    item: {
      delayMs: 300,
      stepDelayMs: 140,
      durationMs: 980,
      threshold: 0.1,
    },
  },

  themeTransition: {
    durationMs: 1000,
  },
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
