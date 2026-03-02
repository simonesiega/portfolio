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

  landingReveal: {
    durationMs: 760,
    delaysMs: {
      heading: 180,
      tagline: 340,
      bio: 480,
      skills: 620,
      cta: 760,
    },
  },

  homePage: {
    divider: {
      durationMs: 600,
    },
  },

  homeCurrentlyBuilding: {
    cards: {
      durationMs: 800,
      stepDelayMs: 150,
    },
  },

  homeContactSection: {
    heading: {
      durationMs: 800,
    },
    description: {
      delayMs: 120,
      durationMs: 800,
    },
    actions: {
      delayMs: 240,
      durationMs: 800,
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
      delayMs: 80,
      durationMs: 980,
      threshold: 0.18,
    },
  },
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
