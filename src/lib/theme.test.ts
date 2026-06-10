import {afterEach, describe, expect, it, vi} from "vitest";
import {appConfig} from "@/lib/config/app-config";
import {
  applySystemTheme,
  applyThemePreference,
  getStoredThemePreference,
  isLightThemeActive,
  setStoredThemePreference,
  themePreference,
} from "./theme";

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const themeAttribute = appConfig.theme.attributeName;
const storageKey = appConfig.theme.storageKey;

function restoreGlobalProperty(name: "document" | "window", descriptor?: PropertyDescriptor) {
  if (descriptor) {
    Object.defineProperty(globalThis, name, descriptor);
    return;
  }

  Reflect.deleteProperty(globalThis, name);
}

function installBrowserGlobals({
  prefersLight = false,
  storedTheme = null,
}: {
  prefersLight?: boolean;
  storedTheme?: string | null;
} = {}) {
  const attributes = new Map<string, string>();
  const storage = new Map<string, string>();

  if (storedTheme !== null) {
    storage.set(storageKey, storedTheme);
  }

  const documentElement = {
    getAttribute: vi.fn((name: string) => attributes.get(name) ?? null),
    setAttribute: vi.fn((name: string, value: string) => {
      attributes.set(name, value);
    }),
  };

  const localStorage = {
    getItem: vi.fn((key: string) => storage.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      storage.set(key, value);
    }),
  };

  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {documentElement},
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage,
      matchMedia: vi.fn(() => ({matches: prefersLight})),
    },
  });

  return {attributes, documentElement, localStorage};
}

describe("theme utilities", () => {
  afterEach(() => {
    restoreGlobalProperty("document", originalDocument);
    restoreGlobalProperty("window", originalWindow);
    vi.restoreAllMocks();
  });

  it("reads only supported stored theme preferences", () => {
    installBrowserGlobals({storedTheme: themePreference.dark});
    expect(getStoredThemePreference()).toBe(themePreference.dark);

    installBrowserGlobals({storedTheme: themePreference.light});
    expect(getStoredThemePreference()).toBe(themePreference.light);

    installBrowserGlobals({storedTheme: themePreference.system});
    expect(getStoredThemePreference()).toBe(themePreference.system);

    installBrowserGlobals({storedTheme: "invalid"});
    expect(getStoredThemePreference()).toBeNull();
  });

  it("persists and applies explicit theme preferences", () => {
    const {attributes, localStorage} = installBrowserGlobals();

    setStoredThemePreference(themePreference.light);
    applyThemePreference(themePreference.light);

    expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, themePreference.light);
    expect(attributes.get(themeAttribute)).toBe(themePreference.light);
    expect(isLightThemeActive()).toBe(true);

    applyThemePreference(themePreference.dark);

    expect(attributes.get(themeAttribute)).toBe(themePreference.dark);
    expect(isLightThemeActive()).toBe(false);
  });

  it("resolves system preference through matchMedia", () => {
    const lightBrowser = installBrowserGlobals({prefersLight: true});
    applySystemTheme();
    expect(lightBrowser.attributes.get(themeAttribute)).toBe(themePreference.light);

    const darkBrowser = installBrowserGlobals({prefersLight: false});
    applyThemePreference(themePreference.system);
    expect(darkBrowser.attributes.get(themeAttribute)).toBe(themePreference.dark);
  });

  it("is safe when browser globals are unavailable", () => {
    restoreGlobalProperty("document");
    restoreGlobalProperty("window");

    expect(getStoredThemePreference()).toBeNull();
    expect(isLightThemeActive()).toBe(false);
    expect(() => applyThemePreference(themePreference.light)).not.toThrow();
    expect(() => applySystemTheme()).not.toThrow();
    expect(() => setStoredThemePreference(themePreference.dark)).not.toThrow();
  });

  it("is safe when localStorage access is restricted", () => {
    installBrowserGlobals();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        localStorage: {
          getItem: vi.fn(() => {
            throw new Error("storage unavailable");
          }),
          setItem: vi.fn(() => {
            throw new Error("storage unavailable");
          }),
        },
        matchMedia: vi.fn(() => ({matches: false})),
      },
    });

    expect(getStoredThemePreference()).toBeNull();
    expect(() => setStoredThemePreference(themePreference.light)).not.toThrow();
  });
});
