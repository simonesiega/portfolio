export const animationTimings = {
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
} as const;

export function toMs(value: number) {
  return `${value}ms`;
}
