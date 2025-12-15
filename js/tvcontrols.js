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
  let maxorminEpreached = false;

  if (clickedButtonId === 'prevButton') { 
    if (episodeInput.value > 1) {
      episodeInput.value = parseInt(episodeInput.value) - 1;
      episodeChanged = true;
    } else {
      maxorminEpreached = true;
    }
  } else if (clickedButtonId === 'nextButton') {
    if (episodeInput.value < maxEpisodes){
      episodeInput.value = parseInt(episodeInput.value) + 1;
      episodeChanged = true;
    } else {
      maxorminEpreached = true;
    }
  }

  if (episodeChanged) {
    setTimeout(() => {
      start();
      if(!maxorminEpreached) currentTargetElement.disabled = false;
    }, 100);
  } else if (maxorminEpreached) {
    currentTargetElement.disabled = false;
  }
}

async function episodesAmount(title, season) {
    const apiKey = "d0004590";
    const apiRes = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}&Season=${season}`
    );
    
    const data = await apiRes.json();

    if (data.Response === "True" && data.Episodes) {
        return data.Episodes.length;
    } else {
        console.error("API Error or no episodes found:", data.Error || "Unknown error");
        return 0;
    }
}