export const animationTimings = {
  landingReveal: {
    durationMs: 760,
    delaysMs: {
      avatar: 0,
      heading: 180,
      location: 340,
      bio: 520,
      skillsTitle: 760,
      skillsText: 900,
      cta: 1060,
    },
  },
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
