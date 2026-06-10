import {particleNetworkConfig} from "@/lib/animation/particle-network-config";
import {clamp} from "@/lib/animation/particle-network/math";
import {spawnParticle} from "@/lib/animation/particle-network/spawning";
import type {DustParticle, Particle, Point} from "@/lib/animation/particle-network/types";

const {motion} = particleNetworkConfig.particleNetwork;

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

    // Add random drift to velocity, scaled by depth for parallax effect, and dampen to prevent runaway speeds.
    particle.vx += (Math.random() - 0.5) * motion.randomDrift * dt;
    particle.vy += (Math.random() - 0.5) * motion.randomDrift * dt;

    // Clamp velocity to max speed to maintain control over motion and prevent extreme values that could cause visual glitches or performance issues.
    particle.vx = clamp(particle.vx, -motion.maxSpeed, motion.maxSpeed);
    particle.vy = clamp(particle.vy, -motion.maxSpeed, motion.maxSpeed);

    // Update position based on velocity and time step.
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;

    // Apply velocity damping to prevent particles from accelerating indefinitely.
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
