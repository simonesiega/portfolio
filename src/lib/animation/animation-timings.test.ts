import {describe, expect, it} from "vitest";
import {animationTimings, toMs} from "./animation-timings";

describe("animation timings", () => {
  it("keeps reveal timings and thresholds valid", () => {
    const revealEntries = [
      animationTimings.scrollRevealDefaults,
      animationTimings.routeReveal,
      animationTimings.homeIntro.hero.image,
      animationTimings.homeIntro.hero.name,
      animationTimings.homeIntro.hero.bio,
      animationTimings.homeIntro.hero.social,
      animationTimings.homeIntro.section,
      animationTimings.secondaryPageHero.metaLabel,
      animationTimings.secondaryPageHero.title,
      animationTimings.secondaryPageHero.subtitle,
      animationTimings.workExperienceList.item,
      animationTimings.projectsShowcaseList.item,
      animationTimings.projectCaseStudy.backLink,
      animationTimings.projectCaseStudy.content,
    ];

    for (const entry of revealEntries) {
      if ("delayMs" in entry) {
        expect(entry.delayMs).toBeGreaterThanOrEqual(0);
      }

      if ("durationMs" in entry) {
        expect(entry.durationMs).toBeGreaterThan(0);
      }

      if ("threshold" in entry) {
        expect(entry.threshold).toBeGreaterThanOrEqual(0);
        expect(entry.threshold).toBeLessThanOrEqual(1);
      }
    }
  });

  it("formats millisecond values consistently", () => {
    expect(toMs(animationTimings.themeTransition.durationMs)).toBe(
      `${animationTimings.themeTransition.durationMs}ms`
    );
  });

  it("keeps standalone delays valid", () => {
    expect(animationTimings.homeIntro.section.stepDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.workExperienceList.item.stepDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.projectsShowcaseList.item.stepDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.projectCaseStudy.hero.metaLabelDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.projectCaseStudy.hero.titleDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.projectCaseStudy.hero.subtitleDelayMs).toBeGreaterThanOrEqual(0);
    expect(animationTimings.themeTransition.syncDelayMs).toBeGreaterThanOrEqual(0);
  });
});
