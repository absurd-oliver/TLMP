// tvcontrols.js

import { els } from "./dom.js";
import { start } from "./player.js";

export const getTvControlsElems = () => ({
  prev: document.getElementById("prevButton"),
  next: document.getElementById("nextButton")
});

/**
 * @param {number} maxEpisodes - The total number of episodes in the season.
 */
export function updateButtonStates(maxEpisodes) {
  const elems = getTvControlsElems();
  const currentEpisode = parseInt(els.episode.value, 10);

  elems.prev.disabled = (currentEpisode <= 1);

  elems.next.disabled = (currentEpisode >= maxEpisodes);
}


export async function episodeChange(event) {
  const currentTargetElement = event.currentTarget;
  const clickedButtonId = currentTargetElement.id; 
  
  currentTargetElement.disabled = true;

  const episodeInput = els.episode;
  // Await the max episodes
  const maxEpisodes = await episodesAmount(els.show.value, els.season.value);

  let episodeChanged = false;

  if (clickedButtonId === 'prevButton') { 
    if (episodeInput.value > 1) {
      episodeInput.value = parseInt(episodeInput.value, 10) - 1;
      episodeChanged = true;
    } 
  } else if (clickedButtonId === 'nextButton') {
    if (episodeInput.value < maxEpisodes){
      episodeInput.value = parseInt(episodeInput.value, 10) + 1;
      episodeChanged = true;
    }
  }

  if (episodeChanged) {
    setTimeout(() => {
      start();
      updateButtonStates(maxEpisodes); 
    }, 100);
  } else {
    updateButtonStates(maxEpisodes);
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
