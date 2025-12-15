import { els } from "./dom.js";
import { start } from "./player.js";

export const elems = {
    prev: document.getElementById("prevButton"),
    next: document.getElementById("nextButton")
};

export function episodeChange(event) {
    const episodeInput = els.episode;

    if (event.currentTarget.id === 'prevButton') {
        if (episodeInput.value > 1) {
                episodeInput.value = parseInt(episodeInput.value) - 1;
        }
        start();
    } else if (event.currentTarget.id === 'nextButton') {
        episodeInput.value = parseInt(episodeInput.value) + 1;
        start();
    }
}
