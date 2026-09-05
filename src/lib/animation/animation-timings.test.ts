import {describe, expect, it} from "vitest";
import {animationTimings, toMs} from "./animation-timings";

type TimingRecord = Record<string, unknown>;

function isRecord(value: unknown): value is TimingRecord {
  return typeof value === "object" && value !== null;
}

describe("animation timings", () => {
  it("keeps every configured duration, delay, and threshold valid", () => {
    let checkedValueCount = 0;

    function visit(value: unknown, path: string) {
      if (!isRecord(value)) {
        return;
      }

      for (const [key, child] of Object.entries(value)) {
        const childPath = `${path}.${key}`;

        if (typeof child === "number" && key.endsWith("Ms")) {
          checkedValueCount += 1;
          expect(child, childPath).toBeGreaterThanOrEqual(0);

          if (key === "durationMs") {
            expect(child, childPath).toBeGreaterThan(0);
          }
        } else if (typeof child === "number" && key === "threshold") {
          checkedValueCount += 1;
          expect(child, childPath).toBeGreaterThanOrEqual(0);
          expect(child, childPath).toBeLessThanOrEqual(1);
        } else {
          visit(child, childPath);
        }
      }
    }

    visit(animationTimings, "animationTimings");
    expect(checkedValueCount).toBeGreaterThan(0);
  });

  it("formats millisecond values for CSS custom properties", () => {
    expect(toMs(0)).toBe("0ms");
    expect(toMs(animationTimings.themeTransition.durationMs)).toBe(
      `${animationTimings.themeTransition.durationMs}ms`
    );
  });
});
