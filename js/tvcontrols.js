import { els } from "./dom.js";
import { start } from "./player.js";

export const getTvControlsElems = () => ({
  prev: document.getElementById("prevButton"),
  next: document.getElementById("nextButton")
});

export async function episodeChange(event) {
  const clickedButtonId = event.currentTarget.id; 
  event.currentTarget.disabled = true;

  const episodeInput = els.episode;
  const maxEpisodes = await episodesAmount(els.show.value, els.season.value);

  let episodeChanged = false;
  let maxepreached = false;

  if (clickedButtonId === 'prevButton') { 
    if (episodeInput.value > 1) {
      episodeInput.value = parseInt(episodeInput.value) - 1;
      episodeChanged = true;
    } else {
      maxepreached = true;
    }
  } else if (clickedButtonId === 'nextButton') {
    if (episodeInput.value < maxEpisodes){
      episodeInput.value = parseInt(episodeInput.value) + 1;
      episodeChanged = true;
    } else {
      maxepreached = true;
    }
  }

  if (episodeChanged) {
    setTimeout(() => {
      start();
      if(!maxepreached) event.currentTarget.disabled = false;
    }, 100);
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
