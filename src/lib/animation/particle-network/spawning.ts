import { particleNetworkConfig } from "@/lib/animation/particle-network-config";
import { clamp, randomBetween, randomGaussian, randomInt } from "@/lib/animation/particle-network/math";
import type {
  DustParticle,
  Particle,
  Point,
  PointerState,
} from "@/lib/animation/particle-network/types";

const { pointer: pointerConfig, motion, spawning, dust } = particleNetworkConfig.particleNetwork;

/**
 * Creates a new primary particle.
 *
 * Spawn strategy can be biased toward:
 * - pointer neighborhood (when interactive respawn is enabled), or
 * - one of several gaussian clusters to avoid visually uniform distribution.
 */
export function spawnParticle({
  width,
  height,
  centers,
  pointer,
  pointerBias,
}: {
  width: number;
  height: number;
  centers: Point[];
  pointer: PointerState;
  pointerBias: boolean;
}): Particle {
  let x = Math.random() * width;
  let y = Math.random() * height;

  // Pointer-biased respawn creates a more interactive feel by keeping new particles within the area of influence, especially after bursts of pointer-driven respawns. Clustered respawn creates visually interesting denser areas that still have some randomness due to the gaussian spread, and prevents the scene from feeling too uniform or grid-like.
  const shouldSpawnNearPointer =
    pointerBias && pointer.active && Math.random() < spawning.nearPointerSpawnChance;
  
  // Clustered spawn is only attempted if not spawning near the pointer, to maintain a balance between interaction and visual interest. If centers are defined but clustered spawn isn't chosen, particles will spawn uniformly, which can help fill in gaps and keep the distribution from feeling too rigid.
  const shouldSpawnInCluster =
    !shouldSpawnNearPointer && Math.random() < spawning.clusteredSpawnChance;

  if (shouldSpawnNearPointer) {
    // Pointer-biased respawn keeps interaction reactive after bursts.
    x = pointer.x + randomGaussian() * pointerConfig.spawnRadius;
    y = pointer.y + randomGaussian() * pointerConfig.spawnRadius;
  } else if (shouldSpawnInCluster && centers.length > 0) {
    const center = centers[randomInt(0, centers.length - 1)];
    // Gaussian spread around cluster center creates denser visual islands.
    const sigma = Math.min(width, height) * spawning.clusterSigmaFactor;
    x = center.x + randomGaussian() * sigma;
    y = center.y + randomGaussian() * sigma;
  }

  x = clamp(x, 0, width);
  y = clamp(y, 0, height);

  const depth = randomBetween(0.46, 1);
  // Higher depth particles move faster and render with stronger presence.
  const speed = randomBetween(spawning.speedMin, spawning.speedMax) * depth;
  const angle = Math.random() * Math.PI * 2;
  const lifetime = randomBetween(motion.lifetimeMin, motion.lifetimeMax);

  // Initial age is randomized to prevent visible patterns of synchronized respawns, which can happen if all particles start with age 0 and have similar lifetimes. By allowing some particles to start with a random age, we create a more natural, continuous flow of particles respawning at different times.
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

  // Dust particles are spawned uniformly across the viewport to create a consistent, non-distracting background layer. Their slower speed and simpler behavior compared to primary particles help add depth and visual interest without competing for attention or overwhelming the scene.
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(dust.radiusMin, dust.radiusMax),
    alpha: randomBetween(dust.alphaMin, dust.alphaMax),
  };
}
