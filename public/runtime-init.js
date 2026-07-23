try {
  const root = document.documentElement;
  root.classList.add("js", "theme-initializing");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.remove("theme-initializing");
    });
  });
} catch {}
