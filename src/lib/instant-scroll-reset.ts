export function instantScrollReset() {
  const root = document.documentElement;
  const previousBehavior = root.dataset.scrollBehavior ?? "smooth";

  root.dataset.scrollBehavior = "auto";
  window.scrollTo(0, 0);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.dataset.scrollBehavior = previousBehavior;
    });
  });
}
