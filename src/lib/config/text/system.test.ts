import {describe, expect, it} from "vitest";
import {systemText} from "./system";

describe("system text model", () => {
  it("keeps not-found copy and actions complete", () => {
    const {notFoundPage} = systemText;

    expect(notFoundPage.hero.sectionId.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.hero.eyebrow.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.hero.title.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.hero.subtitle.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.body.description.trim().length).toBeGreaterThan(0);

    expect(notFoundPage.body.actions.backHomeLabel.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.body.actions.backHomeHref.startsWith("/")).toBe(true);
    expect(notFoundPage.body.actions.openProjectsLabel.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.body.actions.openProjectsHref.startsWith("/")).toBe(true);
    expect(notFoundPage.body.actions.openWorkLabel.trim().length).toBeGreaterThan(0);
    expect(notFoundPage.body.actions.openWorkHref.startsWith("/")).toBe(true);
  });

  it("keeps runtime-error copy and actions complete", () => {
    const {errorPage} = systemText;

    expect(errorPage.hero.sectionId.trim().length).toBeGreaterThan(0);
    expect(errorPage.hero.eyebrow.trim().length).toBeGreaterThan(0);
    expect(errorPage.hero.title.trim().length).toBeGreaterThan(0);
    expect(errorPage.hero.subtitle.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.description.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.diagnosticsLabel.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.diagnosticsFallbackValue.trim().length).toBeGreaterThan(0);

    expect(errorPage.body.actions.retryLabel.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.actions.backHomeLabel.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.actions.backHomeHref.startsWith("/")).toBe(true);
    expect(errorPage.body.actions.openProjectsLabel.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.actions.openProjectsHref.startsWith("/")).toBe(true);
    expect(errorPage.body.actions.openWorkLabel.trim().length).toBeGreaterThan(0);
    expect(errorPage.body.actions.openWorkHref.startsWith("/")).toBe(true);
  });
});
