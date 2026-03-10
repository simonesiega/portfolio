try {
  document.documentElement.classList.add("js");

  var storageKey = "portfolio-theme";
  var themeAttribute = "data-theme";
  var theme = localStorage.getItem(storageKey);
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (theme === "system") {
    if (prefersLight) {
      document.documentElement.setAttribute(themeAttribute, "light");
    } else {
      document.documentElement.removeAttribute(themeAttribute);
    }
  } else if (theme === "light") {
    document.documentElement.setAttribute(themeAttribute, "light");
  } else {
    document.documentElement.removeAttribute(themeAttribute);
  }
} catch {}
