import { applyFont } from "./fonts.js";

export function acknowledgeAdsWarning() {
  const warning = document.getElementById("adsWarning");
  if (!warning) return;

  warning.classList.add("hidden");
  document.body.classList.remove("unclickable");
  document.body.classList.add("clickable");

  const font = localStorage.getItem("font") || "segoeUIfont";
  applyFont(font);
}

export function permanentlyAcknowledgeAdsWarning() {
  if (localStorage.getItem("permaAknow") === "true") {
    acknowledgeAdsWarning();
    return;
  }

  const ans = confirm(
    "Do you want to permanently acknowledge this warning until you clear site data?"
  );

  if (ans) {
    localStorage.setItem("permaAknow", "true");
    acknowledgeAdsWarning();
  }
}
