export const motionInitScript = `(() => {
  const root = document.documentElement;
  root.classList.add("js", "motion-initializing");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => root.classList.remove("motion-initializing"));
  });
})();`;
