export const animationTimings = {
  landingReveal: {
    durationMs: 760,
    delaysMs: {
      heading: 180,
      location: 340,
      bio: 520,
      featuredProject: 680,
      skillsTitle: 820,
      skillsText: 960,
      cta: 1120,
    },
  },
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
