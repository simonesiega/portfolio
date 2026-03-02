import type { Particle, PointerState } from "@/lib/animation/particle-network/types";

export function distanceToPointerSquared(particle: Particle, pointer: PointerState) {
  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  return dx * dx + dy * dy;
}

export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

export function randomGaussian() {
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

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
