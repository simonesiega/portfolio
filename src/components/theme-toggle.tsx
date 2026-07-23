"use client";

import {useEffect, useState} from "react";
import {FiMonitor, FiMoon, FiSun} from "react-icons/fi";
import {animationTimings} from "@/lib/animation/animation-timings";
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
const {labels: themeLabels} = appConfig.theme;
const themeChangingClassName = "theme-changing";

function applyThemeWithoutColorTransitions(preference: ThemePreference) {
  const root = document.documentElement;
  root.classList.add(themeChangingClassName);
  applyThemePreference(preference);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.remove(themeChangingClassName);
    });
  });
}

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
    applyThemeWithoutColorTransitions(preference);
    syncThemeState();
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMediaQuery);
    const syncOnMount = window.setTimeout(
      syncThemeState,
      animationTimings.themeTransition.syncDelayMs
    );

    function handleSystemThemeChange() {
      if (getStoredThemePreference() !== themePreference.system) {
        return;
      }

      applyThemeWithoutColorTransitions(themePreference.system);
      syncThemeState();
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.clearTimeout(syncOnMount);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

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
  const isSystemSelected = selectedPreference === themePreference.system;

  return (
    <div className="flex items-center gap-4" role="group" aria-label={themeLabels.controls}>
      <button
        type="button"
        onClick={() => handleSelectPreference(themePreference.system)}
        aria-pressed={isSystemSelected}
        aria-label={`${themeLabels.useSystem}. ${themeLabels.currentModePrefix}: ${currentModeLabel}.`}
        aria-describedby="theme-status"
        className="theme-toggle-button inline-flex cursor-pointer items-center justify-center rounded-sm p-1 text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
      >
        <FiMonitor aria-hidden={true} className={iconSizeClass} />
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={`${themeLabels.toggleTheme}. ${themeLabels.currentModePrefix}: ${currentModeLabel}.`}
        aria-describedby="theme-status"
        className="theme-toggle-button inline-flex cursor-pointer items-center justify-center rounded-sm p-1 text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ui-fg)]"
      >
        <span className={`relative ${wrapperSizeClass}`}>
          <FiSun
            aria-hidden={true}
            className={`theme-toggle-sun absolute inset-0 ${iconSizeClass} transform-gpu transition-all duration-500 ease-out`}
          />
          <FiMoon
            aria-hidden={true}
            className={`theme-toggle-moon absolute inset-0 ${iconSizeClass} transform-gpu transition-all duration-500 ease-out`}
          />
        </span>
      </button>

      <span id="theme-status" className="sr-only" aria-live="polite">
        {themeLabels.statusPrefix}: {currentModeLabel}
      </span>
    </div>
  );
}
