"use client";

import { useEffect } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { appConfig } from "@/lib/config/app-config";
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

  const iconSizeClass = "h-5 w-5";
  const wrapperSizeClass = "h-5 w-5";

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleSystemMode}
        aria-label={appConfig.theme.labels.useSystem}
        className="inline-flex cursor-pointer items-center justify-center rounded-sm text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
      >
        <FiMonitor className={iconSizeClass} />
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={appConfig.theme.labels.toggleTheme}
        className="inline-flex cursor-pointer items-center justify-center rounded-sm text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
      >
        <span className={`relative ${wrapperSizeClass}`}>
          <FiSun
            className={`theme-toggle-sun absolute inset-0 ${iconSizeClass} transform-gpu transition-all duration-500 ease-out`}
          />
          <FiMoon
            className={`theme-toggle-moon absolute inset-0 ${iconSizeClass} transform-gpu transition-all duration-500 ease-out`}
          />
        </span>
      </button>
    </div>
  );
}
