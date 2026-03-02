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

/**
 * Advances primary particles by one simulation step.
 *
 * Responsibilities:
 * - lifetime/chance-based respawn
 * - optional pointer repulsion
 * - stochastic drift + damping
 * - toroidal wrapping at viewport boundaries
 */
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
    // Small random respawn chance prevents visible long-lived motion loops.
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

    // Apply pointer repulsion if active and within radius, with strength fading linearly with distance.
    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distanceSquared = dx * dx + dy * dy;

      // Only apply repulsion if within pointer radius and avoid extreme forces at very close distances.
      if (
        distanceSquared < pointerConfig.radius * pointerConfig.radius &&
        distanceSquared > 0.01
      ) {
        const distance = Math.sqrt(distanceSquared);
        // Repulsion fades linearly with pointer distance.
        const force = (1 - distance / pointerConfig.radius) * pointerStrength;
        const forceX = (dx / distance) * force * dt * particle.depth;
        const forceY = (dy / distance) * force * dt * particle.depth;

        particle.vx = clamp(particle.vx + forceX, -motion.maxSpeed, motion.maxSpeed);
        particle.vy = clamp(particle.vy + forceY, -motion.maxSpeed, motion.maxSpeed);
      }
    }

    // Add random drift to velocity, scaled by depth for parallax effect, and dampen to prevent runaway speeds.
    particle.vx += (Math.random() - 0.5) * motion.randomDrift * dt;
    particle.vy += (Math.random() - 0.5) * motion.randomDrift * dt;

    // Clamp velocity to max speed to maintain control over motion and prevent extreme values that could cause visual glitches or performance issues.
    particle.vx = clamp(particle.vx, -motion.maxSpeed, motion.maxSpeed);
    particle.vy = clamp(particle.vy, -motion.maxSpeed, motion.maxSpeed);

    // Update position based on velocity and time step.
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    // Apply velocity damping to create a more organic, less mechanical motion feel, and to prevent particles from accelerating indefinitely due to random drift or pointer forces.
    particle.vx *= motion.velocityDamping;
    particle.vy *= motion.velocityDamping;

    // Toroidal wrapping: particles leaving one side re-enter from opposite side.
    if (particle.x < -wrapMargin) {
      particle.x = width + wrapMargin;
    } else if (particle.x > width + wrapMargin) {
      particle.x = -wrapMargin;
    }

    // Vertical wrap is applied independently to allow for different viewport aspect ratios and to maintain consistent behavior regardless of width vs height.
    if (particle.y < -wrapMargin) {
      particle.y = height + wrapMargin;
    } else if (particle.y > height + wrapMargin) {
      particle.y = -wrapMargin;
    }
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

  // Dust particles have a simpler update: they just drift with a constant velocity and wrap around the viewport. They don't interact with the pointer and don't have lifetimes, to keep them lightweight and purely decorative.
  for (const particle of dustParticles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    // Dust uses same wrap behavior as main particles for continuity.
    if (particle.x < -wrapMargin) {
      particle.x = width + wrapMargin;
    } else if (particle.x > width + wrapMargin) {
      particle.x = -wrapMargin;
    }

    // Vertical wrap is applied independently to allow for different viewport aspect ratios and to maintain consistent behavior regardless of width vs height.
    if (particle.y < -wrapMargin) {
      particle.y = height + wrapMargin;
    } else if (particle.y > height + wrapMargin) {
      particle.y = -wrapMargin;
    }
  }
}
