import { particleNetworkConfig } from "@/lib/animation/particle-network-config";
import { clamp, randomBetween, randomGaussian, randomInt } from "@/lib/animation/particle-network/math";
import type {
  DustParticle,
  Particle,
  Point,
  PointerState,
} from "@/lib/animation/particle-network/types";

const { pointer: pointerConfig, motion, spawning, dust } = particleNetworkConfig.particleNetwork;

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

  const shouldSpawnNearPointer =
    pointerBias && pointer.active && Math.random() < spawning.nearPointerSpawnChance;
  const shouldSpawnInCluster =
    !shouldSpawnNearPointer && Math.random() < spawning.clusteredSpawnChance;

  if (shouldSpawnNearPointer) {
    x = pointer.x + randomGaussian() * pointerConfig.spawnRadius;
    y = pointer.y + randomGaussian() * pointerConfig.spawnRadius;
  } else if (shouldSpawnInCluster && centers.length > 0) {
    const center = centers[randomInt(0, centers.length - 1)];
    const sigma = Math.min(width, height) * spawning.clusterSigmaFactor;
    x = center.x + randomGaussian() * sigma;
    y = center.y + randomGaussian() * sigma;
  }

  x = clamp(x, 0, width);
  y = clamp(y, 0, height);

  const depth = randomBetween(0.46, 1);
  const speed = randomBetween(spawning.speedMin, spawning.speedMax) * depth;
  const angle = Math.random() * Math.PI * 2;
  const lifetime = randomBetween(motion.lifetimeMin, motion.lifetimeMax);

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

export function spawnDustParticle(width: number, height: number): DustParticle {
  const speed = randomBetween(dust.speedMin, dust.speedMax);
  const angle = Math.random() * Math.PI * 2;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(dust.radiusMin, dust.radiusMax),
    alpha: randomBetween(dust.alphaMin, dust.alphaMax),
  };
}
