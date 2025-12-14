import { els } from "./dom.js";
import { applyTheme } from "./themes.js";
import { applyFont, fontClasses } from "./fonts.js";
import { start } from "./player.js";
import { acknowledgeAdsWarning } from "./handleadswarning.js";

export function restoreState() {
  els.show.value = localStorage.getItem("lastTitle") || "";

  const isMovie = localStorage.getItem("lastIsMovie") === "true";
  els.mode.checked = isMovie;
  els.tvControls.style.display = isMovie ? "none" : "block";

  els.season.value = localStorage.getItem("lastSeason") || "";
  els.episode.value = localStorage.getItem("lastEpisode") || "";

  const theme = localStorage.getItem("theme");
  applyTheme(theme);

  const font = localStorage.getItem("font") || "segoeUIfont";
  applyFont(font);
  els.fontSelect.value = fontClasses.indexOf(font);

  if (els.show.value) start(); 
  if (localStorage.getItem("permaAknow") === "true") {
    acknowledgeAdsWarning();
  }
}

export function clearStorage() {
    const ans = confirm(
    "Do you want to clear all site data?"
  );

  if (ans) {
    const localItems = [
        'font',
        'lastEpisode',
        'lastIsMovie',
        'lastSeason',
        'lastTitle',
        'permaAknow',
        'theme',
        'quickFindShown'
    ];
    for (const item of localItems) {
        localStorage.removeItem(item);
    }
    window.location.reload();
  }
   
}