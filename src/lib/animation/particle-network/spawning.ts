import {particleNetworkConfig} from "@/lib/animation/particle-network-config";
import {
  clamp,
  randomBetween,
  randomGaussian,
  randomInt,
} from "@/lib/animation/particle-network/math";
import type {DustParticle, Particle, Point} from "@/lib/animation/particle-network/types";

const {motion, spawning, dust} = particleNetworkConfig.particleNetwork;

/**
 * Creates a new primary particle.
 *
 * Spawn strategy can be biased toward one of several gaussian clusters to avoid
 * a visually uniform distribution.
 */
export function spawnParticle({
  width,
  height,
  centers,
}: {
  width: number;
  height: number;
  centers: Point[];
}): Particle {
  let x = Math.random() * width;
  let y = Math.random() * height;

  // Clustered spawn creates denser visual islands while uniform fallback fills gaps.
  if (Math.random() < spawning.clusteredSpawnChance && centers.length > 0) {
    const center = centers[randomInt(0, centers.length - 1)];
    if (center) {
      // Gaussian spread around cluster center creates denser visual islands.
      const sigma = Math.min(width, height) * spawning.clusterSigmaFactor;
      x = center.x + randomGaussian() * sigma;
      y = center.y + randomGaussian() * sigma;
    }
  }

  x = clamp(x, 0, width);
  y = clamp(y, 0, height);

  const depth = randomBetween(0.46, 1);
  // Higher depth particles move faster and render with stronger presence.
  const speed = randomBetween(spawning.speedMin, spawning.speedMax) * depth;
  const angle = Math.random() * Math.PI * 2;
  const lifetime = randomBetween(motion.lifetimeMin, motion.lifetimeMax);

  // Stagger initial ages so particles do not respawn in visible waves.
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(spawning.radiusMin, spawning.radiusMax),
    depth,
    age: randomBetween(0, lifetime * spawning.initialAgeFactorMax),
    lifetime,
  };
}

/**
 * Creates a subtle background dust particle with independent low-speed drift.
 */
export function spawnDustParticle(width: number, height: number): DustParticle {
  const speed = randomBetween(dust.speedMin, dust.speedMax);
  const angle = Math.random() * Math.PI * 2;

  // Keep the slower dust layer evenly distributed across the canvas.
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(dust.radiusMin, dust.radiusMax),
    alpha: randomBetween(dust.alphaMin, dust.alphaMax),
  };
}
