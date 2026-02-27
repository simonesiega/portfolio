"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    applyTheme(isLight);
  }, [isLight]);

  function handleToggle() {
    setIsLight((currentValue) => !currentValue);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex cursor-pointer items-center justify-center text-[var(--header-item-color)] transition duration-300 hover:scale-110 hover:text-[var(--header-item-hover-color)] focus-visible:scale-110 focus-visible:text-[var(--header-item-hover-color)] focus-visible:outline-none"
    >
      <span className="relative h-7 w-7">
        <FiSun
          className={`absolute inset-0 h-7 w-7 transform-gpu transition-all duration-500 ease-out ${
            isLight
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-75 opacity-0"
          }`}
        />
        <FiMoon
          className={`absolute inset-0 h-7 w-7 transform-gpu transition-all duration-500 ease-out ${
            isLight
              ? "rotate-90 scale-75 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </span>
    </button>
  );
}

function applyTheme(isLight: boolean) {
  if (isLight) {
    document.documentElement.setAttribute("data-theme", "light");
    return;
  }

  document.documentElement.removeAttribute("data-theme");
}
