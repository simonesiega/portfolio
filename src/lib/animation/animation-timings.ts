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
      durationMs: 860,
      threshold: 0.12,
    },
    aboutImages: {
      threshold: 0.28,
    },
    aboutClosingLine: {
      delayMs: 180,
      threshold: 0.45,
    },
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

  projectCaseStudy: {
    backLink: {
      delayMs: 60,
      threshold: 0,
    },
    hero: {
      eyebrowDelayMs: 160,
      titleDelayMs: 260,
      subtitleDelayMs: 360,
    },
    content: {
      threshold: 0,
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
