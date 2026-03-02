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

function buildSpatialGrid(particles: Particle[], cellSize: number) {
  const grid = new Map<string, number[]>();

  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index];
    const cellX = Math.floor(particle.x / cellSize);
    const cellY = Math.floor(particle.y / cellSize);
    const key = `${cellX},${cellY}`;

    if (!grid.has(key)) {
      grid.set(key, []);
    }

    grid.get(key)?.push(index);
  }

  return grid;
}
