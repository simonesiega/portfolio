const SCROLL_BEHAVIOR_AUTO = "auto";
const SCROLL_BEHAVIOR_SMOOTH = "smooth";

function setScrollBehaviorMode(mode: "auto" | "smooth") {
  const root = document.documentElement;
  root.dataset.scrollBehavior = mode;
}

export function beginRouteNavigationScrollMode() {
  setScrollBehaviorMode(SCROLL_BEHAVIOR_AUTO);
}

export function resetScrollTopInstant() {
  window.scrollTo(0, 0);
}

export function restoreSmoothScrollMode() {
  setScrollBehaviorMode(SCROLL_BEHAVIOR_SMOOTH);
}
