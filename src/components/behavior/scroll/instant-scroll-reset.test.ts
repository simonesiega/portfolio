import {afterEach, describe, expect, it, vi} from "vitest";
import {
  beginRouteNavigationScrollMode,
  isPlainLeftClick,
  resetScrollTopInstant,
  restoreSmoothScrollMode,
} from "./instant-scroll-reset";

const plainClick = {
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
};

afterEach(() => vi.unstubAllGlobals());

describe("route navigation scrolling", () => {
  it("only intercepts an unmodified, unhandled left click", () => {
    expect(isPlainLeftClick(plainClick)).toBe(true);
  });

  it.each([
    {defaultPrevented: true},
    {button: 1},
    {button: 2},
    {metaKey: true},
    {ctrlKey: true},
    {shiftKey: true},
    {altKey: true},
  ])("preserves native click behavior for %j", (overrides) => {
    expect(isPlainLeftClick({...plainClick, ...overrides})).toBe(false);
  });

  it("disables smooth scrolling before resetting position and restores it afterwards", () => {
    const dataset = {scrollBehavior: "smooth"};
    const scrollTo = vi.fn(() => {
      expect(dataset.scrollBehavior).toBe("auto");
    });
    vi.stubGlobal("document", {documentElement: {dataset}});
    vi.stubGlobal("window", {scrollTo});

    beginRouteNavigationScrollMode();
    expect(dataset.scrollBehavior).toBe("auto");
    resetScrollTopInstant();
    expect(scrollTo).toHaveBeenCalledExactlyOnceWith(0, 0);
    restoreSmoothScrollMode();
    expect(dataset.scrollBehavior).toBe("smooth");
  });
});
