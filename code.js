async function fetchImdbID(title, isMovie) {
  const apiKey = "d0004590";
  const type = isMovie ? "movie" : "series";
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
    title
  )}&type=${type}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data && data.imdbID) {
    return data.imdbID;
  } else {
    alert("Title not found!");
    throw new Error("IMDb ID not found.");
  }
}

async function start() {
  const title = document.getElementById("showInput").value;
  const isMovie = document.getElementById("modeToggle").checked;
  const timestamp = new Date().getTime();

  try {
    const imdbID = await fetchImdbID(title, isMovie);
    const iframe = document.getElementById("showDisplay");

    if (isMovie) {
      iframe.src = `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${timestamp}`;
    } else {
      const season = document.getElementById("seasonInput").value;
      const episode = document.getElementById("episodeInput").value;
      iframe.src = `https://vidsrc.net/embed/tv?imdb=${imdbID}&season=${season}&episode=${episode}&t=${timestamp}`;
    }
  } catch (err) {
    console.error(err);
  }
}

// Hide season/episode inputs when in Movie mode
document.getElementById("modeToggle").addEventListener("change", function () {
  const tvControls = document.getElementById("tvControls");
  tvControls.style.display = this.checked ? "none" : "block";
});

const themeToggle = document.getElementById("themeToggle");

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  }
});

// Toggle and store theme
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("light");
    document.localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

let nextPageToken = null;
let currentQuery = "";
let isLoading = false;



const apiKeyInput = document.getElementById("userApiInput");

// Load saved API key from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  }
});



document.getElementById("showInput").addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        start();
    }
});
document.getElementById("seasonInput").addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        start();
    }
});
document.getElementById("episodeInput").addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        start();
    }
});

const fontClasses = ["segoeUIfont", "cursivefont", "comicsansfont"];

function applyFont(fontClass) {
  const elements = [
    document.body,
    document.getElementById("showInput"),
    document.getElementById("seasonInput"),
    document.getElementById("episodeInput"),
    document.getElementById("fontSelect"),
    document.getElementById("findButton")
  ];

  elements.forEach(el => {
    el.classList.remove(...fontClasses); // remove all font classes
    el.classList.add(fontClass);         // add the new one
  });
}

document.getElementById("fontSelect").addEventListener("change", function () {
  const select = this; // "this" is the <select>

  if (select.value === "0") {
    applyFont("segoeUIfont");
  } else if (select.value === "1") {
    applyFont("cursivefont");
  } else if (select.value === "2") {
    applyFont("comicsansfont");
  } else {
    console.error("Unknown font option:", select.value);
  }
});

var quickFindToggleVariable = 0;
var quickFindDivChildShowTextParentToggleVariable = 1;
var quickFindDivChildMovieTextParentToggleVariable = 1;

function quickFind() {
  if (quickFindToggleVariable === 0){
    document.getElementById("quickFindOptionsDiv").classList.remove("hidden");
    quickFindToggleVariable = 1;
  } else if (quickFindToggleVariable === 1){
    document.getElementById("quickFindOptionsDiv").classList.add("hidden");
    quickFindToggleVariable = 0;
  }
  
}

document.getElementById("divchildshowtextparent").addEventListener("click", function() {
  if (quickFindDivChildShowTextParentToggleVariable === 0){
    document.getElementById("divchildshows").classList.remove("hidden");
    document.getElementById("divchildshowtextparent").innerHTML = "shows (click) ↓";
    quickFindDivChildShowTextParentToggleVariable = 1;
  } else if (quickFindDivChildShowTextParentToggleVariable === 1){
    document.getElementById("divchildshows").classList.add("hidden");
    document.getElementById("divchildshowtextparent").innerHTML = "shows (click) →";
    quickFindDivChildShowTextParentToggleVariable = 0;
  }
});

document.getElementById("divchildmovietextparent").addEventListener("click", function() {
  if (quickFindDivChildMovieTextParentToggleVariable === 0){
    document.getElementById("divchildmovies").classList.remove("hidden");
    document.getElementById("divchildmovietextparent").innerHTML = "movies (click) ↓";
    quickFindDivChildMovieTextParentToggleVariable = 1;
  } else if (quickFindDivChildMovieTextParentToggleVariable === 1){
    document.getElementById("divchildmovies").classList.add("hidden");
    document.getElementById("divchildmovietextparent").innerHTML = "movies (click) →";
    quickFindDivChildMovieTextParentToggleVariable = 0;
  }
});

async function quickFindMediaShows(poster){
  const quickshowtimestamp = new Date().getTime();
  try {
    const imdbID = await fetchImdbID(poster, false);
    const iframe = document.getElementById("showDisplay");
    const quickseason = 1;
    const quickepisode = 1;
    iframe.src = `https://vidsrc.net/embed/tv?imdb=${imdbID}&season=${quickseason}&episode=${quickepisode}&t=${quickshowtimestamp}`;
  } catch (err) {
    console.error(err);
  }
  document.getElementById("showInput").value = poster;
  document.getElementById("seasonInput").value = 1;
  document.getElementById("episodeInput").value = 1;
  document.getElementById("modeToggle").checked = false;
  const tvControls = document.getElementById("tvControls");
  tvControls.style.display = document.getElementById("modeToggle").checked ? "none" : "block";
}


async function quickFindMediaMovies(poster){
  const quickmovietimestamp = new Date().getTime();
  try {
    const imdbID = await fetchImdbID(poster, true);
    const iframe = document.getElementById("showDisplay");
    iframe.src = `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${quickmovietimestamp}`;
  } catch (err) {
    console.error(err);
  }
  document.getElementById("showInput").value = poster;
  document.getElementById("modeToggle").checked = true;
  const tvControls = document.getElementById("tvControls");
  tvControls.style.display = document.getElementById("modeToggle").checked ? "none" : "block";
}


