export const animationConfig = {
  particleNetwork: {
    reducedMotionQuery: "(prefers-reduced-motion: reduce)",
    density: {
      baseParticles: 0.00012,
      baseDust: 0.00008,
      minParticles: 70,
      maxParticles: 165,
      reducedMotionParticleFactor: 0.42,
      reducedMotionMinParticles: 30,
      reducedMotionDustFactor: 0.35,
      reducedMotionMinDust: 12,
      minDust: 28,
    },
    links: {
      baseDistance: 118,
      pointerDistance: 170,
    },
    pointer: {
      radius: 190,
      spawnRadius: 130,
      strength: 140,
    },
    motion: {
      maxSpeed: 34,
      randomDrift: 0.75,
      velocityDamping: 0.996,
      respawnRatePerSecond: 0.03,
      lifetimeMin: 14,
      lifetimeMax: 30,
      particleWrapMargin: 44,
      dustWrapMargin: 26,
    },
  },
} as const;
