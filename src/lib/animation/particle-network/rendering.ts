import { particleNetworkConfig } from "@/lib/animation/particle-network-config";
import { distanceToPointerSquared } from "@/lib/animation/particle-network/math";
import {
  updateDustParticles,
  updateParticles,
} from "@/lib/animation/particle-network/physics";
import type {
  DustParticle,
  NetworkColors,
  Particle,
  Point,
  PointerState,
} from "@/lib/animation/particle-network/types";

const { links, pointer: pointerConfig } = particleNetworkConfig.particleNetwork;

/**
 * Executes one full visual frame:
 * 1) clear canvas
 * 2) update simulation state
 * 3) draw links, points, and dust layers
 */
export function drawFrame({
  context,
  width,
  height,
  dt,
  particles,
  dustParticles,
  pointer,
  reducedMotion,
  centers,
  colors,
}: {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  dt: number;
  particles: Particle[];
  dustParticles: DustParticle[];
  pointer: PointerState;
  reducedMotion: boolean;
  centers: Point[];
  colors: NetworkColors;
}) {
  context.clearRect(0, 0, width, height);

  updateParticles({
    particles,
    width,
    height,
    dt,
    pointer,
    reducedMotion,
    centers,
  });
  updateDustParticles({ dustParticles, width, height, dt });

  drawLinks({ context, particles, pointer, colors });
  drawPoints({ context, particles, pointer, colors });
  drawDust({ context, dustParticles, colors });
}

/**
 * Draws proximity links between neighboring particles.
 *
 * A spatial grid keeps pair checks bounded and avoids O(n^2) scans.
 */
function drawLinks({
  context,
  particles,
  pointer,
  colors,
}: {
  context: CanvasRenderingContext2D;
  particles: Particle[];
  pointer: PointerState;
  colors: NetworkColors;
}) {
  const cellSize = links.pointerDistance;
  // Grid cell size tied to max interactive link distance.
  const grid = buildSpatialGrid(particles, cellSize);

  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index];
    const cellX = Math.floor(particle.x / cellSize);
    const cellY = Math.floor(particle.y / cellSize);

    for (let ox = -1; ox <= 1; ox += 1) {
      for (let oy = -1; oy <= 1; oy += 1) {
        const key = `${cellX + ox},${cellY + oy}`;
        const neighborIndexes = grid.get(key);
        if (!neighborIndexes) {
          continue;
        }

        for (const neighborIndex of neighborIndexes) {
          if (neighborIndex <= index) {
            continue;
          }

          const neighbor = particles[neighborIndex];
          const nearPointer =
            pointer.active &&
            (distanceToPointerSquared(particle, pointer) <
              pointerConfig.radius * pointerConfig.radius ||
              distanceToPointerSquared(neighbor, pointer) <
                pointerConfig.radius * pointerConfig.radius);

          // Expand link radius near pointer for stronger local feedback.
          const linkDistance = nearPointer ? links.pointerDistance : links.baseDistance;
          const linkDistanceSquared = linkDistance * linkDistance;

          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > linkDistanceSquared) {
            continue;
          }

          const distance = Math.sqrt(distanceSquared);
          const alphaBase = 1 - distance / linkDistance;
          const alphaBoost = nearPointer ? 1.35 : 1;
          // Keep line intensity proportional to normalized proximity.
          const alpha = alphaBase * alphaBoost;

          context.strokeStyle = `rgba(${colors.linkRgb},${alpha * 0.2})`;
          context.lineWidth = 0.3 + alpha * 0.85;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      }
    }
  }
}

/**
 * Draws particle glow and core dot.
 * Pointer proximity increases contrast and opacity.
 */
function drawPoints({
  context,
  particles,
  pointer,
  colors,
}: {
  context: CanvasRenderingContext2D;
  particles: Particle[];
  pointer: PointerState;
  colors: NetworkColors;
}) {
  for (const particle of particles) {
    const nearPointer =
      pointer.active &&
      distanceToPointerSquared(particle, pointer) < pointerConfig.radius * pointerConfig.radius;

    const glowAlpha = nearPointer ? 0.3 : 0.18;
    const dotAlpha = nearPointer ? 0.95 : 0.58 + particle.depth * 0.32;

    context.fillStyle = `rgba(${colors.pointRgb},${glowAlpha * particle.depth})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius * 2.45, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = `rgba(${colors.pointRgb},${dotAlpha})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  }
}

/**
 * Draws small ambient particles that add background texture.
 */
function drawDust({
  context,
  dustParticles,
  colors,
}: {
  context: CanvasRenderingContext2D;
  dustParticles: DustParticle[];
  colors: NetworkColors;
}) {
  // Dust particles are drawn with a simple filled circle, with alpha based on their individual alpha property and a shared RGB color from the theme. They don't interact with the pointer and have a subtle presence to add depth and visual interest to the background without distracting from the main particle network.
  for (const particle of dustParticles) {
    context.fillStyle = `rgba(${colors.dustRgb},${particle.alpha})`;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  }
}

/**
 * Buckets particles into fixed-size cells for efficient neighbor lookup.
 */
function buildSpatialGrid(particles: Particle[], cellSize: number) {
  const grid = new Map<string, number[]>();

  // Each particle is assigned to a cell based on its coordinates. The grid is a map where the key is a string of the form "cellX,cellY" and the value is an array of particle indexes that fall into that cell. This allows for efficient retrieval of nearby particles by only checking the current cell and its 8 neighbors, rather than all particles.
  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index];
    const cellX = Math.floor(particle.x / cellSize);
    const cellY = Math.floor(particle.y / cellSize);
    const key = `${cellX},${cellY}`;

    // Lazily allocate only occupied cells. This keeps memory usage down, especially since many cells may be empty in a sparse distribution. It also simplifies the logic for adding particles to cells, as we don't need to pre-initialize a large grid structure.
    if (!grid.has(key)) {
      grid.set(key, []);
    }

    grid.get(key)?.push(index);
  }

  return grid;
}
