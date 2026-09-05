import {particleNetworkConfig} from "@/lib/animation/particle-network-config";
import {updateDustParticles, updateParticles} from "@/lib/animation/particle-network/physics";
import type {
  DustParticle,
  NetworkColors,
  Particle,
  Point,
} from "@/lib/animation/particle-network/types";

const {links} = particleNetworkConfig.particleNetwork;

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
  centers,
  colors,
}: {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  dt: number;
  particles: Particle[];
  dustParticles: DustParticle[];
  centers: Point[];
  colors: NetworkColors;
}) {
  context.clearRect(0, 0, width, height);

  updateParticles({
    particles,
    width,
    height,
    dt,
    centers,
  });
  updateDustParticles({dustParticles, width, height, dt});

  drawLinks({context, particles, colors});
  drawPoints({context, particles, colors});
  drawDust({context, dustParticles, colors});
}

/**
 * Draws proximity links between neighboring particles.
 *
 * A spatial grid keeps pair checks bounded and avoids O(n^2) scans.
 */
function drawLinks({
  context,
  particles,
  colors,
}: {
  context: CanvasRenderingContext2D;
  particles: Particle[];
  colors: NetworkColors;
}) {
  const linkDistance = links.baseDistance;
  const linkDistanceSquared = linkDistance * linkDistance;
  // Grid cell size is tied to the maximum link distance.
  const grid = buildSpatialGrid(particles, linkDistance);

  for (const [index, particle] of particles.entries()) {
    const cellX = Math.floor(particle.x / linkDistance);
    const cellY = Math.floor(particle.y / linkDistance);

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
          if (!neighbor) {
            continue;
          }

          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > linkDistanceSquared) {
            continue;
          }

          const distance = Math.sqrt(distanceSquared);
          // Keep line intensity proportional to normalized proximity.
          const alpha = 1 - distance / linkDistance;

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
 */
function drawPoints({
  context,
  particles,
  colors,
}: {
  context: CanvasRenderingContext2D;
  particles: Particle[];
  colors: NetworkColors;
}) {
  for (const particle of particles) {
    const glowAlpha = 0.18;
    const dotAlpha = 0.58 + particle.depth * 0.32;

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

  // Neighbor checks only need the current cell and its eight adjacent cells.
  for (const [index, particle] of particles.entries()) {
    const cellX = Math.floor(particle.x / cellSize);
    const cellY = Math.floor(particle.y / cellSize);
    const key = `${cellX},${cellY}`;

    const cell = grid.get(key);
    if (cell) {
      cell.push(index);
    } else {
      grid.set(key, [index]);
    }
  }

  return grid;
}
