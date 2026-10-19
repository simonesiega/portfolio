import {afterEach, describe, expect, it, vi} from "vitest";
import {particleNetworkConfig} from "../particle-network-config";
import {updateDustParticles, updateParticles} from "./physics";
import type {DustParticle, Particle} from "./types";

const {motion} = particleNetworkConfig.particleNetwork;
const width = 800;
const height = 600;

function createParticle(overrides: Partial<Particle> = {}): Particle {
  return {
    x: 100,
    y: 100,
    vx: 10,
    vy: -10,
    radius: 2,
    depth: 0.8,
    age: 1,
    lifetime: 20,
    ...overrides,
  };
}

function advance(particle: Particle, dt = 0.1) {
  updateParticles({particles: [particle], width, height, dt, centers: []});
}

afterEach(() => vi.restoreAllMocks());

describe("particle simulation", () => {
  it("advances age and position with elapsed time, then damps velocity", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const particle = createParticle();
    advance(particle);
    expect(particle.age).toBeCloseTo(1.1);
    expect(particle.x).toBe(101);
    expect(particle.y).toBe(99);
    expect(particle.vx).toBe(10 * motion.velocityDamping);
    expect(particle.vy).toBe(-10 * motion.velocityDamping);
  });

  it("clamps drift before integrating position", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const particle = createParticle({vx: 100, vy: -100});
    advance(particle);
    expect(particle.x).toBe(100 + motion.maxSpeed * 0.1);
    expect(particle.y).toBe(100 - motion.maxSpeed * 0.1);
    expect(particle.vx).toBe(motion.maxSpeed * motion.velocityDamping);
    expect(particle.vy).toBe(-motion.maxSpeed * motion.velocityDamping);
  });

  it.each([
    {
      x: -motion.particleWrapMargin - 1,
      y: 100,
      expectedX: width + motion.particleWrapMargin,
      expectedY: 100,
    },
    {
      x: width + motion.particleWrapMargin + 1,
      y: 100,
      expectedX: -motion.particleWrapMargin,
      expectedY: 100,
    },
    {
      x: 100,
      y: -motion.particleWrapMargin - 1,
      expectedX: 100,
      expectedY: height + motion.particleWrapMargin,
    },
    {
      x: 100,
      y: height + motion.particleWrapMargin + 1,
      expectedX: 100,
      expectedY: -motion.particleWrapMargin,
    },
  ])("wraps particles crossing the viewport margin: $x, $y", ({x, y, expectedX, expectedY}) => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const particle = createParticle({x, y, vx: 0, vy: 0});
    advance(particle);
    expect(particle.x).toBe(expectedX);
    expect(particle.y).toBe(expectedY);
  });

  it.each(["lifetime", "chance"] as const)(
    "respawns in place by %s without moving the new particle",
    (reason) => {
      vi.spyOn(Math, "random")
        .mockReturnValue(0.5)
        .mockReturnValueOnce(reason === "chance" ? 0 : 0.5);
      const particle = createParticle({age: reason === "lifetime" ? 20 : 1});
      advance(particle);
      expect(particle.x).toBe(width / 2);
      expect(particle.y).toBe(height / 2);
      expect(particle.age).toBeLessThan(particle.lifetime);
      expect(particle.lifetime).toBeGreaterThanOrEqual(motion.lifetimeMin);
      expect(particle.lifetime).toBeLessThanOrEqual(motion.lifetimeMax);
    }
  );

  it("moves and wraps dust without primary-particle damping or respawn", () => {
    const particle: DustParticle = {
      x: width + motion.dustWrapMargin,
      y: -motion.dustWrapMargin,
      vx: 2,
      vy: -2,
      radius: 1,
      alpha: 0.2,
    };
    updateDustParticles({dustParticles: [particle], width, height, dt: 0.5});
    expect(particle).toEqual({
      x: -motion.dustWrapMargin,
      y: height + motion.dustWrapMargin,
      vx: 2,
      vy: -2,
      radius: 1,
      alpha: 0.2,
    });
  });
});
