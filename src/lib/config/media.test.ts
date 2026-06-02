import {describe, expect, it} from "vitest";
import {mediaConfig} from "./media";

describe("media config", () => {
  it("keeps raster image dimensions positive", () => {
    const dimensionPairs = [
      mediaConfig.home.profileImage,
      mediaConfig.home.workLogo,
      mediaConfig.home.aboutImage,
      mediaConfig.work.logo,
      mediaConfig.projects.caseStudyDiagram,
    ];

    for (const dimensions of dimensionPairs) {
      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(0);
    }
  });

  it("keeps optimized image settings valid", () => {
    expect(mediaConfig.home.profileImage.priority).toBe(true);
    expect(mediaConfig.home.aboutImage.eagerFirstImage).toBe(true);
    expect(mediaConfig.projects.caseStudyDiagram.priority).toBe(true);
  });
});
