import { els } from "./dom.js";

export async function fetchImdbID(title, isMovie) {
  const apiKey = "d0004590";
  const type = isMovie ? "movie" : "series";

  const res = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&type=${type}&apikey=${apiKey}`
  );

  const data = await res.json();
  if (!data?.imdbID) throw new Error("Title not found");
  return data.imdbID;
}

export async function start() {
  const title = els.show.value.trim();
  if (!title) return;

  const isMovie = els.mode.checked;
  const timestamp = Date.now();

  localStorage.setItem("lastTitle", title);
  localStorage.setItem("lastIsMovie", String(isMovie));

  try {
    const imdbID = await fetchImdbID(title, isMovie);
    document.title = "";
    if (isMovie) {
      els.iframe.src = `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${timestamp}`;
      document.title = `${title} on TLMP`;
    } else {
      const season = els.season.value || 1;
      const episode = els.episode.value || 1;

      localStorage.setItem("lastSeason", season);
      localStorage.setItem("lastEpisode", episode);

      els.iframe.src =
        `https://vidsrc.net/embed/tv?imdb=${imdbID}` +
        `&season=${season}&episode=${episode}&t=${timestamp}`;
      document.title = `${title}S${season}E${episode} on TLMP`;
    }
  } catch (err) {
    alert("Title not found");
    console.error(err);
  }
}

export async function quickFindMedia(title, isMovie) {
  const imdbID = await fetchImdbID(title, isMovie);
  const t = Date.now();

  els.show.value = title;
  els.mode.checked = isMovie;
  els.tvControls.style.display = isMovie ? "none" : "block";

  if (!isMovie) {
    els.season.value = 1;
    els.episode.value = 1;
  }

  els.iframe.src = isMovie
    ? `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${t}`
    : `https://vidsrc.net/embed/tv?imdb=${imdbID}&season=1&episode=1&t=${t}`;

  localStorage.setItem("lastTitle", title);
  localStorage.setItem("lastIsMovie", String(isMovie));
}
