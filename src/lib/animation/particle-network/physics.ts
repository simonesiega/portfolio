import {particleNetworkConfig} from "@/lib/animation/particle-network-config";
import {clamp} from "@/lib/animation/particle-network/math";
import {spawnParticle} from "@/lib/animation/particle-network/spawning";
import type {DustParticle, Particle, Point} from "@/lib/animation/particle-network/types";

const {motion} = particleNetworkConfig.particleNetwork;

function wrapPoint(point: Point, width: number, height: number, margin: number) {
  if (point.x < -margin) {
    point.x = width + margin;
  } else if (point.x > width + margin) {
    point.x = -margin;
  }

  if (point.y < -margin) {
    point.y = height + margin;
  } else if (point.y > height + margin) {
    point.y = -margin;
  }
}

/**
 * Advances primary particles by one simulation step.
 *
 * Responsibilities:
 * - lifetime/chance-based respawn
 * - stochastic drift + damping
 * - toroidal wrapping at viewport boundaries
 */
export function updateParticles({
  particles,
  width,
  height,
  dt,
  centers,
}: {
  particles: Particle[];
  width: number;
  height: number;
  dt: number;
  centers: Point[];
}) {
  const wrapMargin = motion.particleWrapMargin;

  for (const particle of particles) {
    particle.age += dt;

    const shouldRespawnByLifetime = particle.age >= particle.lifetime;
    // Small random respawn chance prevents visible long-lived motion loops.
    const shouldRespawnByChance = Math.random() < motion.respawnRatePerSecond * dt;

    if (shouldRespawnByLifetime || shouldRespawnByChance) {
      Object.assign(
        particle,
        spawnParticle({
          width,
          height,
          centers,
        })
      );
      continue;
    }

    particle.vx += (Math.random() - 0.5) * motion.randomDrift * dt;
    particle.vy += (Math.random() - 0.5) * motion.randomDrift * dt;
    particle.vx = clamp(particle.vx, -motion.maxSpeed, motion.maxSpeed);
    particle.vy = clamp(particle.vy, -motion.maxSpeed, motion.maxSpeed);

    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vx *= motion.velocityDamping;
    particle.vy *= motion.velocityDamping;

    wrapPoint(particle, width, height, wrapMargin);
  }
}

/**
 * Advances background dust particles with simple drift and wrap.
 */
export function updateDustParticles({
  dustParticles,
  width,
  height,
  dt,
}: {
  dustParticles: DustParticle[];
  width: number;
  height: number;
  dt: number;
}) {
  const wrapMargin = motion.dustWrapMargin;

  for (const particle of dustParticles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    wrapPoint(particle, width, height, wrapMargin);
  }
}
