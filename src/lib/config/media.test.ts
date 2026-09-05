import {describe, expect, it} from "vitest";
import {mediaConfig} from "./media";

type ConfigRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ConfigRecord {
  return typeof value === "object" && value !== null;
}

describe("media config", () => {
  it("defines complete positive dimensions for every image preset", () => {
    let presetCount = 0;

    function visit(value: unknown, path: string) {
      if (!isRecord(value)) {
        return;
      }

      if ("width" in value || "height" in value) {
        presetCount += 1;
        expect(value.width, `${path}.width`).toEqual(expect.any(Number));
        expect(value.height, `${path}.height`).toEqual(expect.any(Number));
        expect(value.width as number, `${path}.width`).toBeGreaterThan(0);
        expect(value.height as number, `${path}.height`).toBeGreaterThan(0);
        return;
      }

      for (const [key, child] of Object.entries(value)) {
        visit(child, path ? `${path}.${key}` : key);
      }
    }

    visit(mediaConfig, "mediaConfig");
    expect(presetCount).toBeGreaterThan(0);
  });
});
