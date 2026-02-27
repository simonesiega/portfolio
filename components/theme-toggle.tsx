"use client";

import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  function handleToggle() {
    const rootElement = document.documentElement;
    const isCurrentlyLight = rootElement.getAttribute("data-theme") === "light";

    if (isCurrentlyLight) {
      rootElement.removeAttribute("data-theme");
      window.localStorage.setItem("portfolio-theme", "dark");
      return;
    }

    rootElement.setAttribute("data-theme", "light");
    window.localStorage.setItem("portfolio-theme", "light");
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle color theme"
      className="inline-flex cursor-pointer items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
    >
      <span className="theme-toggle-icons relative h-7 w-7">
        <FiSun
          className="theme-toggle-sun absolute inset-0 h-7 w-7 transform-gpu transition-all duration-500 ease-out"
        />
        <FiMoon
          className="theme-toggle-moon absolute inset-0 h-7 w-7 transform-gpu transition-all duration-500 ease-out"
        />
      </span>
    </button>
  );
}
