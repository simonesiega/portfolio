"use client";

import { useEffect, useRef } from "react";
import { animationConfig } from "@/lib/animation-config";

type ParticleNetworkProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  age: number;
  lifetime: number;
};

type DustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type Point = {
  x: number;
  y: number;
};

type NetworkColors = {
  pointRgb: string;
  linkRgb: string;
  dustRgb: string;
};

const { particleNetwork } = animationConfig;
const {
  reducedMotionQuery,
  density,
  links,
  pointer: pointerConfig,
  motion,
} = particleNetwork;

export function ParticleNetwork({ className }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dustRef = useRef<DustParticle[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const centersRef = useRef<Point[]>([]);
  const reducedMotionRef = useRef(false);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const colorsRef = useRef<NetworkColors>({
    pointRgb: "245,245,245",
    linkRgb: "245,245,245",
    dustRgb: "255,255,255",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);
    reducedMotionRef.current = reducedMotionMedia.matches;

    const syncNetworkColors = () => {
      const styles = getComputedStyle(document.documentElement);
      colorsRef.current = {
        pointRgb:
          styles.getPropertyValue("--network-point-rgb").trim() || "245,245,245",
        linkRgb:
          styles.getPropertyValue("--network-link-rgb").trim() || "245,245,245",
        dustRgb:
          styles.getPropertyValue("--network-dust-rgb").trim() || "255,255,255",
      };
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimensionsRef.current = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const { width, height } = dimensionsRef.current;
      const area = width * height;

      const baseCount = clamp(
        Math.round(area * density.baseParticles),
        density.minParticles,
        density.maxParticles,
      );

      const particleCount = reducedMotionRef.current
        ? Math.max(
            density.reducedMotionMinParticles,
            Math.round(baseCount * density.reducedMotionParticleFactor),
          )
        : baseCount;

      const dustCount = reducedMotionRef.current
        ? Math.max(
            density.reducedMotionMinDust,
            Math.round(area * density.baseDust * density.reducedMotionDustFactor),
          )
        : Math.max(density.minDust, Math.round(area * density.baseDust));

      centersRef.current = Array.from({ length: randomInt(3, 6) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
      }));

      particlesRef.current = Array.from({ length: particleCount }, () =>
        spawnParticle({
          width,
          height,
          centers: centersRef.current,
          pointer: pointerRef.current,
          pointerBias: false,
        }),
      );

      dustRef.current = Array.from({ length: dustCount }, () =>
        spawnDustParticle(width, height),
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;

      const isInside =
        localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height;

      if (!isInside) {
        pointerRef.current.active = false;
        return;
      }

      pointerRef.current.x = localX;
      pointerRef.current.y = localY;
      pointerRef.current.active = true;
    };

    const clearPointer = () => {
      pointerRef.current.active = false;
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      initParticles();
    });

    const themeObserver = new MutationObserver(syncNetworkColors);

    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    reducedMotionMedia.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", clearPointer);

    resizeCanvas();
    syncNetworkColors();
    initParticles();

    let previousTime = performance.now();

    const frame = (time: number) => {
      const dt = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      drawFrame({
        context,
        width: dimensionsRef.current.width,
        height: dimensionsRef.current.height,
        dt,
        particles: particlesRef.current,
        dustParticles: dustRef.current,
        pointer: pointerRef.current,
        reducedMotion: reducedMotionRef.current,
        centers: centersRef.current,
        colors: colorsRef.current,
      });

      animationFrameRef.current = window.requestAnimationFrame(frame);
    };

    animationFrameRef.current = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      reducedMotionMedia.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function drawFrame({
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

function updateParticles({
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

function updateDustParticles({
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
            (distanceToPointerSquared(particle, pointer) < pointerConfig.radius * pointerConfig.radius ||
              distanceToPointerSquared(neighbor, pointer) < pointerConfig.radius * pointerConfig.radius);

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

function spawnParticle({
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
}) {
  let x = Math.random() * width;
  let y = Math.random() * height;

  const shouldSpawnNearPointer =
    pointerBias && pointer.active && Math.random() < 0.58;
  const shouldSpawnInCluster = !shouldSpawnNearPointer && Math.random() < 0.3;

  if (shouldSpawnNearPointer) {
    x = pointer.x + randomGaussian() * pointerConfig.spawnRadius;
    y = pointer.y + randomGaussian() * pointerConfig.spawnRadius;
  } else if (shouldSpawnInCluster && centers.length > 0) {
    const center = centers[randomInt(0, centers.length - 1)];
    const sigma = Math.min(width, height) * 0.18;
    x = center.x + randomGaussian() * sigma;
    y = center.y + randomGaussian() * sigma;
  }

  x = clamp(x, 0, width);
  y = clamp(y, 0, height);

  const depth = randomBetween(0.46, 1);
  const speed = randomBetween(6, 18) * depth;
  const angle = Math.random() * Math.PI * 2;
  const lifetime = randomBetween(motion.lifetimeMin, motion.lifetimeMax);

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(1.05, 2.35),
    depth,
    age: randomBetween(0, lifetime * 0.32),
    lifetime,
  };
}

function spawnDustParticle(width: number, height: number) {
  const speed = randomBetween(2, 6);
  const angle = Math.random() * Math.PI * 2;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(0.5, 1.25),
    alpha: randomBetween(0.08, 0.34),
  };
}

function distanceToPointerSquared(particle: Particle, pointer: PointerState) {
  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  return dx * dx + dy * dy;
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

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function randomGaussian() {
  let u = 0;
  let v = 0;

  while (u === 0) {
    u = Math.random();
  }

  while (v === 0) {
    v = Math.random();
  }

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
