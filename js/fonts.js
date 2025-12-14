import { els } from "./dom.js";

export const fontClasses = [
  "segoeUIfont",
  "cursivefont",
  "comicsansfont",
];

export function applyFont(font) {
  document.querySelectorAll("*").forEach((el) =>
    el.classList.remove(...fontClasses)
  );
  document.body.classList.add(font);
  localStorage.setItem("font", font);
}

export function initFonts() {
  els.fontSelect.addEventListener("change", () => {
    applyFont(fontClasses[els.fontSelect.value] || fontClasses[0]);
  });
}
