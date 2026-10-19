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

export function beginRouteNavigationScrollMode() {
  document.documentElement.dataset.scrollBehavior = "auto";
}

export function resetScrollTopInstant() {
  window.scrollTo(0, 0);
}

export function restoreSmoothScrollMode() {
  document.documentElement.dataset.scrollBehavior = "smooth";
}
