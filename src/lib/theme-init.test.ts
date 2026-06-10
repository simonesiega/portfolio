import {afterEach, describe, expect, it, vi} from "vitest";
import {appConfig} from "@/lib/config/app-config";
import {themeInitScript} from "./theme-init";
import {themePreference} from "./theme";

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const themeAttribute = appConfig.theme.attributeName;
const storageKey = appConfig.theme.storageKey;

function restoreGlobalProperty(
  name: "document" | "localStorage" | "window",
  descriptor?: PropertyDescriptor
) {
  if (descriptor) {
    Object.defineProperty(globalThis, name, descriptor);
    return;
  }

  Reflect.deleteProperty(globalThis, name);
}

function runThemeInitScript() {
  Function(themeInitScript)();
}

function installThemeInitGlobals({
  getItem = () => null,
  matchMedia = () => ({matches: false}),
}: {
  getItem?: (key: string) => string | null;
  matchMedia?: (query: string) => {matches: boolean};
} = {}) {
  const attributes = new Map<string, string>();
  const documentElement = {
    setAttribute: vi.fn((name: string, value: string) => {
      attributes.set(name, value);
    }),
  };

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {documentElement},
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {getItem: vi.fn(getItem)},
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {matchMedia: vi.fn(matchMedia)},
  });

  return {attributes};
}

describe("theme init script", () => {
  afterEach(() => {
    restoreGlobalProperty("document", originalDocument);
    restoreGlobalProperty("localStorage", originalLocalStorage);
    restoreGlobalProperty("window", originalWindow);
    vi.restoreAllMocks();
  });

  it("applies stored explicit preferences before hydration", () => {
    const lightBrowser = installThemeInitGlobals({
      getItem: (key) => (key === storageKey ? themePreference.light : null),
    });
    runThemeInitScript();
    expect(lightBrowser.attributes.get(themeAttribute)).toBe(themePreference.light);

    const darkBrowser = installThemeInitGlobals({
      getItem: (key) => (key === storageKey ? themePreference.dark : null),
    });
    runThemeInitScript();
    expect(darkBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);
  });

  it("resolves stored system preference from media query", () => {
    const lightBrowser = installThemeInitGlobals({
      getItem: () => themePreference.system,
      matchMedia: () => ({matches: true}),
    });
    runThemeInitScript();
    expect(lightBrowser.attributes.get(themeAttribute)).toBe(themePreference.light);

    const darkBrowser = installThemeInitGlobals({
      getItem: () => themePreference.system,
      matchMedia: () => ({matches: false}),
    });
    runThemeInitScript();
    expect(darkBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);
  });

  it("falls back to dark for missing or invalid stored values", () => {
    const missingBrowser = installThemeInitGlobals();
    runThemeInitScript();
    expect(missingBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);

    const invalidBrowser = installThemeInitGlobals({getItem: () => "sepia"});
    runThemeInitScript();
    expect(invalidBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);
  });

  it("still chooses a safe default when storage or media query access fails", () => {
    const storageErrorBrowser = installThemeInitGlobals({
      getItem: () => {
        throw new Error("storage disabled");
      },
    });
    expect(() => runThemeInitScript()).not.toThrow();
    expect(storageErrorBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);

    const mediaErrorBrowser = installThemeInitGlobals({
      getItem: () => themePreference.system,
      matchMedia: () => {
        throw new Error("media unavailable");
      },
    });
    expect(() => runThemeInitScript()).not.toThrow();
    expect(mediaErrorBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);
  });
});
