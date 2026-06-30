const SCROLL_BEHAVIOR_AUTO = "auto";
const SCROLL_BEHAVIOR_SMOOTH = "smooth";
let skipNextRouteScrollReset = false;

function setScrollBehaviorMode(mode: "auto" | "smooth") {
  const root = document.documentElement;
  root.dataset.scrollBehavior = mode;
}

export function beginRouteNavigationScrollMode() {
  setScrollBehaviorMode(SCROLL_BEHAVIOR_AUTO);
}

export function beginViewTransitionRouteNavigation() {
  skipNextRouteScrollReset = true;
  beginRouteNavigationScrollMode();
}

export function consumeSkipNextRouteScrollReset() {
  const shouldSkip = skipNextRouteScrollReset;
  skipNextRouteScrollReset = false;
  return shouldSkip;
}

export function resetScrollTopInstant() {
  window.scrollTo(0, 0);
}

export function restoreSmoothScrollMode() {
  setScrollBehaviorMode(SCROLL_BEHAVIOR_SMOOTH);
}
