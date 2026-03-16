import {createHash} from "node:crypto";
import {appConfig} from "@/lib/config/app-config";
import {themePreference} from "@/lib/theme";

const {storageKey, prefersLightMediaQuery, attributeName} = appConfig.theme;

const serializedStorageKey = JSON.stringify(storageKey);
const serializedPrefersLightMediaQuery = JSON.stringify(prefersLightMediaQuery);
const serializedSystem = JSON.stringify(themePreference.system);
const serializedLight = JSON.stringify(themePreference.light);
const serializedDark = JSON.stringify(themePreference.dark);
const serializedThemeAttribute = JSON.stringify(attributeName);

export const themeInitScript = `try{var storageKey=${serializedStorageKey};var themeAttribute=${serializedThemeAttribute};var theme=localStorage.getItem(storageKey);var prefersLight=window.matchMedia(${serializedPrefersLightMediaQuery}).matches;if(theme===${serializedSystem}){if(prefersLight){document.documentElement.setAttribute(themeAttribute,${serializedLight});}else{document.documentElement.setAttribute(themeAttribute,${serializedDark});}}else if(theme===${serializedLight}){document.documentElement.setAttribute(themeAttribute,${serializedLight});}else{document.documentElement.setAttribute(themeAttribute,${serializedDark});}}catch(e){}`;

export const themeInitScriptHash = createHash("sha256").update(themeInitScript).digest("base64");
