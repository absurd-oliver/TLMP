import { els } from "./dom.js";
import { getTvControlsElems, episodeChange } from "./tvcontrols.js";
import { initThemes } from "./themes.js";
import { initQuickFind } from "./quickfind.js";
import { initFonts } from "./fonts.js";
import { restoreState, clearStorage } from "./storage.js";
import { start, quickFindMedia } from "./player.js";
import { toggleQuickFind } from "./quickfind.js";
import {
  acknowledgeAdsWarning,
  permanentlyAcknowledgeAdsWarning
} from "./handleadswarning.js";

/* Enter key handling */
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    e.target.matches("#showInput, #seasonInput, #episodeInput")
  ) {
    start();
  }
});

/* Mode toggle */
els.mode.addEventListener("change", () => {
  els.tvControls.style.display = els.mode.checked ? "none" : "block";
});

/* Init */
window.addEventListener("DOMContentLoaded", () => {
  initThemes();
  initQuickFind();
  initFonts();
  restoreState();

  /* Next / Previous Buttons */
  const elems = getTvControlsElems(); 
  
  if (elems.prev && elems.next) {
      elems.prev.addEventListener("click", episodeChange);
      elems.next.addEventListener("click", episodeChange);
  } else {
      console.error("Previous or Next buttons not found in HTML!");
  }
});

/* expose for inline HTML handlers */
window.start = start;
window.quickFind = toggleQuickFind;

window.quickFindMediaShows = (title) =>
  quickFindMedia(title, false);

window.quickFindMediaMovies = (title) =>
  quickFindMedia(title, true);

document.addEventListener("DOMContentLoaded", () => {
  const acknowledgeBtn = document.querySelector("#adsWarning button");
  if (acknowledgeBtn) acknowledgeBtn.addEventListener("click", acknowledgeAdsWarning);

  const permaBtn = document.getElementById("permaAcknowledgeButton");
  if (permaBtn) permaBtn.addEventListener("click", permanentlyAcknowledgeAdsWarning);
  
  const clearStorageBtn = document.getElementById("clearLocalStorageButton");
  if (clearStorageBtn) clearStorageBtn.addEventListener("click", clearStorage);

  const redirectBtn = document.getElementById("redirectButton");
  if (redirectBtn) {
    redirectBtn.addEventListener("click", () => {
      window.location.href = "https://absurd-oliver.github.io/landing/";
    });
  }
});


