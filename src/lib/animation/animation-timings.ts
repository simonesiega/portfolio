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

  homeIntro: {
    hero: {
      image: {
        delayMs: 80,
        durationMs: 900,
        threshold: 0.05,
      },
      name: {
        delayMs: 170,
        durationMs: 900,
        threshold: 0.05,
      },
      bio: {
        delayMs: 260,
        durationMs: 980,
        threshold: 0.05,
      },
      social: {
        delayMs: 360,
        durationMs: 900,
        threshold: 0.05,
      },
    },
    section: {
      delayMs: 120,
      initialViewportDelayMs: 560,
      stepDelayMs: 180,
      durationMs: 860,
      threshold: 0.06,
    },
  },

  secondaryPageHero: {
    metaLabel: {
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
      delayMs: 520,
      stepDelayMs: 240,
      durationMs: 980,
      threshold: 0.1,
    },
  },

  projectsShowcaseList: {
    item: {
      delayMs: 520,
      stepDelayMs: 240,
      durationMs: 980,
      threshold: 0.1,
    },
  },

  projectCaseStudy: {
    metaLabel: {
      delayMs: 360,
      initialViewportDelayMs: 360,
      durationMs: 860,
      threshold: 0.06,
    },
    content: {
      delayMs: 120,
      initialViewportDelayMs: 560,
      stepDelayMs: 180,
      durationMs: 860,
      threshold: 0.06,
    },
  },

  themeTransition: {
    durationMs: 1000,
    syncDelayMs: 0,
  },
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
