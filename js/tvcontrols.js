import { els } from "./dom.js";
import { start } from "./player.js";

export const getTvControlsElems = () => ({
  prev: document.getElementById("prevButton"),
  next: document.getElementById("nextButton")
});

export async function episodeChange(event) {
  const currentTargetElement = event.currentTarget;
  const clickedButtonId = currentTargetElement.id; 
  
  currentTargetElement.disabled = true;

  const episodeInput = els.episode;
  const maxEpisodes = await episodesAmount(els.show.value, els.season.value);

  let episodeChanged = false;

  if (clickedButtonId === 'prevButton') { 
    if (episodeInput.value > 1) {
      episodeInput.value = parseInt(episodeInput.value) - 1;
      episodeChanged = true;
    } 
  } else if (clickedButtonId === 'nextButton') {
    if (episodeInput.value < maxEpisodes){
      episodeInput.value = parseInt(episodeInput.value) + 1;
      episodeChanged = true;
    }
  }

  if (episodeChanged) {
    setTimeout(() => {
      start();
      currentTargetElement.disabled = false;
    }, 100);
  } else {
    currentTargetElement.disabled = false;
    console.log(`Max episodes (${maxEpisodes}) reached or minimum reached.`);
  }
}

async function episodesAmount(title, season) {
    const apiKey = "d0004590";
    const apiRes = await fetch(
        `www.omdbapi.com{apiKey}&t=${encodeURIComponent(title)}&Season=${season}`
    );
    
    const data = await apiRes.json();

    if (data.Response === "True" && data.Episodes) {
        return data.Episodes.length;
    } else {
        console.error("API Error or no episodes found:", data.Error || "Unknown error");
        return 0;
    }
}
