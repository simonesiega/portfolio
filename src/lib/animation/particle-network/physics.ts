import { particleNetworkConfig } from "@/lib/animation/particle-network-config";
import { clamp } from "@/lib/animation/particle-network/math";
import { spawnParticle } from "@/lib/animation/particle-network/spawning";
import type {
  DustParticle,
  Particle,
  Point,
  PointerState,
} from "@/lib/animation/particle-network/types";

const { motion, pointer: pointerConfig } = particleNetworkConfig.particleNetwork;

export function updateParticles({
  particles,
  width,
  height,
  dt,
  pointer,
  reducedMotion,
  centers,
}: {
  particles: Particle[];
  width: number;
  height: number;
  dt: number;
  pointer: PointerState;
  reducedMotion: boolean;
  centers: Point[];
}) {
  const wrapMargin = motion.particleWrapMargin;
  const pointerStrength = reducedMotion ? 0 : pointerConfig.strength;

  for (const particle of particles) {
    particle.age += dt;

    const shouldRespawnByLifetime = particle.age >= particle.lifetime;
    const shouldRespawnByChance = Math.random() < motion.respawnRatePerSecond * dt;

    if (shouldRespawnByLifetime || shouldRespawnByChance) {
      Object.assign(
        particle,
        spawnParticle({
          width,
          height,
          centers,
          pointer,
          pointerBias: true,
        }),
      );
      continue;
    }

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distanceSquared = dx * dx + dy * dy;

      if (
        distanceSquared < pointerConfig.radius * pointerConfig.radius &&
        distanceSquared > 0.01
      ) {
        const distance = Math.sqrt(distanceSquared);
        const force = (1 - distance / pointerConfig.radius) * pointerStrength;
        const forceX = (dx / distance) * force * dt * particle.depth;
        const forceY = (dy / distance) * force * dt * particle.depth;

        particle.vx = clamp(particle.vx + forceX, -motion.maxSpeed, motion.maxSpeed);
        particle.vy = clamp(particle.vy + forceY, -motion.maxSpeed, motion.maxSpeed);
      }
    }

    particle.vx += (Math.random() - 0.5) * motion.randomDrift * dt;
    particle.vy += (Math.random() - 0.5) * motion.randomDrift * dt;

    particle.vx = clamp(particle.vx, -motion.maxSpeed, motion.maxSpeed);
    particle.vy = clamp(particle.vy, -motion.maxSpeed, motion.maxSpeed);

    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    particle.vx *= motion.velocityDamping;
    particle.vy *= motion.velocityDamping;

    if (particle.x < -wrapMargin) {
      particle.x = width + wrapMargin;
    } else if (particle.x > width + wrapMargin) {
      particle.x = -wrapMargin;
    }

    if (particle.y < -wrapMargin) {
      particle.y = height + wrapMargin;
    } else if (particle.y > height + wrapMargin) {
      particle.y = -wrapMargin;
    }
  }
}

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

    if (particle.x < -wrapMargin) {
      particle.x = width + wrapMargin;
    } else if (particle.x > width + wrapMargin) {
      particle.x = -wrapMargin;
    }

    if (particle.y < -wrapMargin) {
      particle.y = height + wrapMargin;
    } else if (particle.y > height + wrapMargin) {
      particle.y = -wrapMargin;
    }
  }
}
