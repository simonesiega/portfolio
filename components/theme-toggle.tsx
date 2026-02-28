"use client";

import { useEffect } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { siteConfig } from "@/lib/site-config";
import {
  applyThemePreference,
  getPrefersLightMediaQuery,
  getStoredThemePreference,
  isLightThemeActive,
  setStoredThemePreference,
  themePreference,
} from "@/lib/theme";

const prefersLightMediaQuery = getPrefersLightMediaQuery();

export function ThemeToggle() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMediaQuery);

    function handleSystemThemeChange() {
      if (getStoredThemePreference() !== themePreference.system) {
        return;
      }

      applyThemePreference(themePreference.system);
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function handleSystemMode() {
    setStoredThemePreference(themePreference.system);
    applyThemePreference(themePreference.system);
  }

  function handleToggle() {
    const isCurrentlyLight = isLightThemeActive();
    if (isCurrentlyLight) {
      setStoredThemePreference(themePreference.dark);
      applyThemePreference(themePreference.dark);
      return;
    }

    setStoredThemePreference(themePreference.light);
    applyThemePreference(themePreference.light);
  }

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={handleSystemMode}
        aria-label={siteConfig.theme.labels.useSystem}
        className="inline-flex cursor-pointer items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
      >
        <FiMonitor className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={siteConfig.theme.labels.toggleTheme}
        className="inline-flex cursor-pointer items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
      >
        <span className="theme-toggle-icons relative h-6 w-6">
          <FiSun
            className="theme-toggle-sun absolute inset-0 h-6 w-6 transform-gpu transition-all duration-500 ease-out"
          />
          <FiMoon
            className="theme-toggle-moon absolute inset-0 h-6 w-6 transform-gpu transition-all duration-500 ease-out"
          />
        </span>
      </button>
    </div>
  );
}
