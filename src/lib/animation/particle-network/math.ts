import type {Particle, PointerState} from "@/lib/animation/particle-network/types";

/**
 * Returns squared pointer distance to avoid unnecessary square roots.
 */
export function distanceToPointerSquared(particle: Particle, pointer: PointerState) {
  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  return dx * dx + dy * dy;
}

/**
 * Uniform random number in [min, max).
 */
export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * Uniform random integer in [min, max].
 */
export function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

/**
 * Standard normal random sample using Box-Muller transform.
 */
export function randomGaussian() {
  let u = 0;
  let v = 0;

  // Avoid zero because log(0) is undefined in Box-Muller.
  while (u === 0) {
    u = Math.random();
  }

  // Same for the second independent uniform sample.
  while (v === 0) {
    v = Math.random();
  }

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Numeric clamp helper used across motion constraints.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
