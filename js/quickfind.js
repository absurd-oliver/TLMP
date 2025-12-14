import { els } from "./dom.js";

function toggleSection(section, button, label, key) {
  const hidden = section.classList.toggle("hidden");
  button.textContent = `${label} (click) ${hidden ? "→" : "↓"}`;
  localStorage.setItem(key, String(!hidden));
}

export function toggleQuickFind() {
  const hidden = els.quickFind.classList.toggle("hidden");
  localStorage.setItem("quickFindShown", String(!hidden));
}

export function initQuickFind() {
  els.showsBtn.onclick = () =>
    toggleSection(els.shows, els.showsBtn, "shows", "showsShown");

  els.moviesBtn.onclick = () =>
    toggleSection(els.movies, els.moviesBtn, "movies", "moviesShown");
}
