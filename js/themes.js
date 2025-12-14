import { els } from "./dom.js";

export function applyTheme(theme) {
  document.body.classList.remove("light", "pink");
  if (theme) document.body.classList.add(theme);
  localStorage.setItem("theme", theme || "");
}

export function initThemes() {
  els.themeLight.addEventListener("change", () => {
    if (els.themeLight.checked) {
      els.themePink.checked = false;
      applyTheme("light");
    } else applyTheme("");
  });

  els.themePink.addEventListener("change", () => {
    if (els.themePink.checked) {
      els.themeLight.checked = false;
      applyTheme("pink");
    } else applyTheme("");
  });
}
