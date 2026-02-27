"use client";

import { useEffect } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const THEME_STORAGE_KEY = "portfolio-theme";
const PREFERS_LIGHT_QUERY = "(prefers-color-scheme: light)";

export function ThemeToggle() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(PREFERS_LIGHT_QUERY);

    function handleSystemThemeChange() {
      if (window.localStorage.getItem(THEME_STORAGE_KEY) !== "system") {
        return;
      }

      applySystemTheme();
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function handleSystemMode() {
    window.localStorage.setItem(THEME_STORAGE_KEY, "system");
    applySystemTheme();
  }

  function handleToggle() {
    const rootElement = document.documentElement;
    const isCurrentlyLight = rootElement.getAttribute("data-theme") === "light";

    if (isCurrentlyLight) {
      rootElement.removeAttribute("data-theme");
      window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
      return;
    }

    rootElement.setAttribute("data-theme", "light");
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
  }

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={handleSystemMode}
        aria-label="Use system color theme"
        className="inline-flex cursor-pointer items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
      >
        <FiMonitor className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label="Toggle color theme"
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

function applySystemTheme() {
  const prefersLightTheme = window.matchMedia(PREFERS_LIGHT_QUERY).matches;

  if (prefersLightTheme) {
    document.documentElement.setAttribute("data-theme", "light");
    return;
  }

  document.documentElement.removeAttribute("data-theme");
}
