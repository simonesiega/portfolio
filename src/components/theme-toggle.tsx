"use client";

import {useEffect, useState} from "react";
import {FiMonitor, FiMoon, FiSun} from "react-icons/fi";
import {appConfig} from "@/lib/config/app-config";
import {
  applyThemePreference,
  getPrefersLightMediaQuery,
  getStoredThemePreference,
  isLightThemeActive,
  setStoredThemePreference,
  type ThemePreference,
  themePreference,
} from "@/lib/theme";

const prefersLightMediaQuery = getPrefersLightMediaQuery();
const fallbackThemePreference: ThemePreference = themePreference.dark;

export function ThemeToggle() {
  const [selectedPreference, setSelectedPreference] =
    useState<ThemePreference>(fallbackThemePreference);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(themePreference.dark);

  function syncThemeState() {
    const storedPreference = getStoredThemePreference() ?? fallbackThemePreference;
    setSelectedPreference(storedPreference);
    setResolvedMode(isLightThemeActive() ? themePreference.light : themePreference.dark);
  }

  function handleSelectPreference(preference: ThemePreference) {
    setStoredThemePreference(preference);
    applyThemePreference(preference);
    syncThemeState();
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMediaQuery);
    const syncOnMount = window.setTimeout(syncThemeState, 0);

    function handleSystemThemeChange() {
      if (getStoredThemePreference() !== themePreference.system) {
        return;
      }

      applyThemePreference(themePreference.system);
      syncThemeState();
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.clearTimeout(syncOnMount);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function handleSystemMode() {
    handleSelectPreference(themePreference.system);
  }

  function handleToggle() {
    const isCurrentlyLight = isLightThemeActive();
    if (isCurrentlyLight) {
      handleSelectPreference(themePreference.dark);
      return;
    }

    handleSelectPreference(themePreference.light);
  }

  const iconSizeClass = "h-5 w-5";
  const wrapperSizeClass = "h-5 w-5";
  const currentModeLabel =
    selectedPreference === themePreference.system
      ? `${themePreference.system} (${resolvedMode})`
      : selectedPreference;

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleSystemMode}
        aria-label={`${appConfig.theme.labels.useSystem}. Current mode: ${currentModeLabel}.`}
        aria-pressed={selectedPreference === themePreference.system}
        className="theme-toggle-button inline-flex cursor-pointer items-center justify-center rounded-sm text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
      >
        <FiMonitor className={iconSizeClass} />
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={`${appConfig.theme.labels.toggleTheme}. Current mode: ${currentModeLabel}.`}
        aria-pressed={selectedPreference !== themePreference.system}
        className="theme-toggle-button inline-flex cursor-pointer items-center justify-center rounded-sm text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
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

      <span className="sr-only" aria-live="polite">
        Theme mode: {currentModeLabel}
      </span>
    </div>
  );
}
