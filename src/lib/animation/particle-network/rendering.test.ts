import {describe, expect, it, vi} from "vitest";
import {particleNetworkConfig} from "../particle-network-config";
import {drawFrame} from "./rendering";
import type {Particle} from "./types";

const distance = particleNetworkConfig.particleNetwork.links.baseDistance;

function createContext() {
  return {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
  };
}

describe("particle rendering", () => {
  it("draws each nearby pair exactly once, including adjacent grid cells and negative positions", () => {
    const coordinates = [
      [-1, 0],
      [0, 0],
      [distance - 1, 0],
      [distance, 0],
      [distance + 1, 1],
      [0, distance - 1],
      [distance * 4, distance * 4],
    ];
    const particles: Particle[] = coordinates.map(([x = 0, y = 0]) => ({
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 1,
      depth: 1,
      age: 0,
      lifetime: 100,
    }));
    const expectedPairs: string[] = [];
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i]!;
        const b = particles[j]!;
        if ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 <= distance ** 2) {
          expectedPairs.push(`${a.x},${a.y}:${b.x},${b.y}`);
        }
      }
    }
    const context = createContext();
    drawFrame({
      context: context as unknown as CanvasRenderingContext2D,
      width: 800,
      height: 600,
      dt: 0,
      particles,
      dustParticles: [],
      centers: [],
      colors: {pointRgb: "1,2,3", linkRgb: "4,5,6", dustRgb: "7,8,9"},
    });
    const actualPairs = context.moveTo.mock.calls.map(
      (start, index) => `${start.join(",")}:${context.lineTo.mock.calls[index]!.join(",")}`
    );
    expect(actualPairs.sort()).toEqual(expectedPairs.sort());
    expect(context.stroke).toHaveBeenCalledTimes(expectedPairs.length);
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    expect(context.arc).toHaveBeenCalledTimes(particles.length * 2);
    expect(context.fill).toHaveBeenCalledTimes(particles.length * 2);
  });

  it("clears an empty scene without drawing stale particles", () => {
    const context = createContext();
    drawFrame({
      context: context as unknown as CanvasRenderingContext2D,
      width: 800,
      height: 600,
      dt: 0,
      particles: [],
      dustParticles: [],
      centers: [],
      colors: {pointRgb: "1,2,3", linkRgb: "4,5,6", dustRgb: "7,8,9"},
    });
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, 800, 600);
    expect(context.stroke).not.toHaveBeenCalled();
    expect(context.fill).not.toHaveBeenCalled();
  });
});
