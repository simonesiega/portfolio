import {appConfig} from "@/lib/config/app-config";

export const themePreference = {
  dark: "dark",
  light: "light",
  system: "system",
} as const;

export type ThemePreference = (typeof themePreference)[keyof typeof themePreference];

const {storageKey, prefersLightMediaQuery, attributeName} = appConfig.theme;

export function getThemeInitScript() {
  const serializedStorageKey = JSON.stringify(storageKey);
  const serializedPrefersLightMediaQuery = JSON.stringify(prefersLightMediaQuery);
  const serializedSystem = JSON.stringify(themePreference.system);
  const serializedLight = JSON.stringify(themePreference.light);
  const serializedThemeAttribute = JSON.stringify(attributeName);

  return `try{var storageKey=${serializedStorageKey};var themeAttribute=${serializedThemeAttribute};var theme=localStorage.getItem(storageKey);var prefersLight=window.matchMedia(${serializedPrefersLightMediaQuery}).matches;if(theme===${serializedSystem}){if(prefersLight){document.documentElement.setAttribute(themeAttribute,${serializedLight});}else{document.documentElement.removeAttribute(themeAttribute);}}else if(theme===${serializedLight}){document.documentElement.setAttribute(themeAttribute,${serializedLight});}else{document.documentElement.removeAttribute(themeAttribute);}}catch(e){}`;
}

export function isLightThemeActive() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.documentElement.getAttribute(attributeName) === themePreference.light;
}

export function applyThemePreference(preference: ThemePreference) {
  if (typeof document === "undefined") {
    return;
  }

  if (preference === themePreference.system) {
    applySystemTheme();
    return;
  }

  if (preference === themePreference.light) {
    document.documentElement.setAttribute(attributeName, themePreference.light);
    return;
  }

  document.documentElement.removeAttribute(attributeName);
}

export function applySystemTheme() {
  if (typeof window === "undefined") {
    return;
  }

  const prefersLightTheme = window.matchMedia(prefersLightMediaQuery).matches;

  if (prefersLightTheme) {
    document.documentElement.setAttribute(attributeName, themePreference.light);
    return;
  }

  document.documentElement.removeAttribute(attributeName);
}

export function getStoredThemePreference() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedPreference = window.localStorage.getItem(storageKey);

  if (storedPreference === themePreference.dark) {
    return themePreference.dark;
  }

  if (storedPreference === themePreference.light) {
    return themePreference.light;
  }

  if (storedPreference === themePreference.system) {
    return themePreference.system;
  }

  return null;
}

export function setStoredThemePreference(preference: ThemePreference) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, preference);
}

export function getPrefersLightMediaQuery() {
  return prefersLightMediaQuery;
}
