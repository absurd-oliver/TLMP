import { els } from "./dom.js";
import { start } from "./player.js";

export const elems = {
    prev: document.getElementById("prevButton"),
    next: document.getElementById("nextButton")
};

export async function episodeChange(e) {
    const episodeInput = els.episode;
    const maxEpisodes = await episodesAmount(els.show.value, els.season.value);

    let episodeChanged = false;

    if (e.id === 'prevButton') {
        if (episodeInput.value > 1) {
            episodeInput.value = parseInt(episodeInput.value) - 1;
            episodeChanged = true;
        }
    } else if (e.id === 'nextButton') {
        if (episodeInput.value < maxEpisodes){
            episodeInput.value = parseInt(episodeInput.value) + 1;
            episodeChanged = true;
        }
    }

    if (episodeChanged) {
        setTimeout(() => {
            start();
        }, 0); 
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
