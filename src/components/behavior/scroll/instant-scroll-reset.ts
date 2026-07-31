const SCROLL_BEHAVIOR_AUTO = "auto";
const SCROLL_BEHAVIOR_SMOOTH = "smooth";

type ClickEvent = {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};

export function isPlainLeftClick(event: ClickEvent) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

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
