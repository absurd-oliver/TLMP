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
  localStorage.setItem("lastTitle", `${title}`);
  localStorage.setItem("lastIsMovie", `${isMovie}`);

  try {
    const imdbID = await fetchImdbID(title, isMovie);
    const iframe = document.getElementById("showDisplay");

    if (isMovie) {
      iframe.src = `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${timestamp}`;
    } else {
      const season = document.getElementById("seasonInput").value;
      const episode = document.getElementById("episodeInput").value;
      localStorage.setItem("lastSeason", `${season}`);
      localStorage.setItem("lastEpisode", `${episode}`);
      iframe.src = `https://vidsrc.net/embed/tv?imdb=${imdbID}&season=${season}&episode=${episode}&t=${timestamp}`;
    }
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("modeToggle").addEventListener("change", function () {
  const tvControls = document.getElementById("tvControls");
  tvControls.style.display = this.checked ? "none" : "block";
});

const themeToggle = document.getElementById("themeToggle");
const pinkThemeToggle = document.getElementById("themeTogglePink");

var themeWas = '';

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    pinkThemeToggle.checked = false;
    document.body.classList.add("light");
    document.body.classList.remove("pink");
    themeWas = localStorage.getItem("theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", themeWas);
  }
});

pinkThemeToggle.addEventListener("change", () => {
  if (pinkThemeToggle.checked) {
    themeToggle.checked = false;
    document.body.classList.add("pink");
    document.body.classList.remove("light");
    themeWas = localStorage.getItem("theme");
    localStorage.setItem("theme", "pink");
  } else {
    document.body.classList.remove("pink");
    localStorage.setItem("theme", themeWas);
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
    document.getElementById("findButton"),
    document.getElementById("clearLocalStorageButton"),
    document.getElementById("optionsButton"),
    document.getElementById("feedback"),
    document.getElementById("sendFeedbackButton"),
    document.getElementById("permaAcknowledgeButton")
  ];

  elements.forEach(el => {
    el.classList.remove(...fontClasses);
    el.classList.add(fontClass);
  });
}

document.getElementById("fontSelect").addEventListener("change", function () {
  const select = this;

  if (select.value === "0") {
    applyFont("segoeUIfont");
    localStorage.setItem("font", "segoeUIfont");
  } else if (select.value === "1") {
    applyFont("cursivefont");
    localStorage.setItem("font", "cursivefont");
  } else if (select.value === "2") {
    applyFont("comicsansfont");
    localStorage.setItem("font", "comicsansfont");
  } else {
    console.error("Unknown font option:", select.value);
  }
});

var quickFindToggleVariable = 1;
var quickFindDivChildShowTextParentToggleVariable = 1;
var quickFindDivChildMovieTextParentToggleVariable = 1;

function quickFind() {
  if (quickFindToggleVariable === 0){
    document.getElementById("quickFindOptionsDiv").classList.remove("hidden");
    quickFindToggleVariable = 1;
    localStorage.setItem("quickFindShown", "true");
  } else if (quickFindToggleVariable === 1){
    document.getElementById("quickFindOptionsDiv").classList.add("hidden");
    quickFindToggleVariable = 0;
    localStorage.setItem("quickFindShown", "false");
  }
  
}

document.getElementById("divchildshowtextparent").addEventListener("click", function() {
  if (quickFindDivChildShowTextParentToggleVariable === 0){
    document.getElementById("divchildshows").classList.remove("hidden");
    document.getElementById("divchildshowtextparent").innerHTML = "shows (click) ↓";
    quickFindDivChildShowTextParentToggleVariable = 1;
    localStorage.setItem("showsShown", "true");
  } else if (quickFindDivChildShowTextParentToggleVariable === 1){
    document.getElementById("divchildshows").classList.add("hidden");
    document.getElementById("divchildshowtextparent").innerHTML = "shows (click) →";
    quickFindDivChildShowTextParentToggleVariable = 0;
    localStorage.setItem("showsShown", "false");
  }
});

document.getElementById("divchildmovietextparent").addEventListener("click", function() {
  if (quickFindDivChildMovieTextParentToggleVariable === 0){
    document.getElementById("divchildmovies").classList.remove("hidden");
    document.getElementById("divchildmovietextparent").innerHTML = "movies (click) ↓";
    quickFindDivChildMovieTextParentToggleVariable = 1;
    localStorage.setItem("moviesShown", "true");
  } else if (quickFindDivChildMovieTextParentToggleVariable === 1){
    document.getElementById("divchildmovies").classList.add("hidden");
    document.getElementById("divchildmovietextparent").innerHTML = "movies (click) →";
    quickFindDivChildMovieTextParentToggleVariable = 0;
    localStorage.setItem("moviesShown", "false");
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
  localStorage.setItem("lastTitle", `${poster}`);
  localStorage.setItem("lastIsMovie", 'false');
  localStorage.setItem("lastSeason", '1');
  localStorage.setItem("lastEpisode", '1');
  document.getElementById("seasonInput").classList.remove("hidden");
  document.getElementById("episodeInput").classList.remove("hidden");
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
  localStorage.setItem("lastTitle", `${poster}`);
  localStorage.setItem("lastIsMovie", 'true');
}

function adblockCheck(){
  document.getElementById("adsWarning").classList.add("hidden");
  document.body.classList.replace("unclickable", "clickable");
  let currentfont = localStorage.getItem("font");
  applyFont(currentfont)
  if (currentfont === "segoeUIfont"){
    document.getElementById("fontSelect").value = 0;
  } else if (currentfont === "cursivefont"){
    document.getElementById("fontSelect").value = 1;
  } else if (currentfont === "comicsansfont"){
    document.getElementById("fontSelect").value = 2;
  } else {document.getElementById("fontSelect").value = 0;}
}

function permaAcknowledge(){
  if (localStorage.getItem("permaAknow") === "true") return;
  let ans = confirm("do you want to permanently acknowledge the adblocker warning until you clear cookies ?");
  if (ans){
    localStorage.setItem("permaAknow", "true");
  } else {return}
}

function footerClick(){
  window.location.href = "https://github.com/absurd-oliver/TLMP/commits/main/";
}

function clearLocalStorage(){
  let ans = confirm("are you sure you want to clear all cookies from this website");
  if (ans){
  localStorage.setItem("lastTitle", "");
  localStorage.setItem("lastIsMovie", "");
  localStorage.setItem("lastSeason", "");
  localStorage.setItem("lastEpisode", "");
  localStorage.setItem("theme", "");
  localStorage.setItem("quickFindShown", "");
  localStorage.setItem("showsShown", "");
  localStorage.setItem("moviesShown", "");
  localStorage.setItem("permaAknow", "false");
  localStorage.setItem("font", "segoeUIfont");
  window.location.reload(true);
  } else {return}
}

function redirect(){
  window.location.href = "https://absurd-oliver.github.io/landing/index.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const lastTitleLocal = localStorage.getItem("lastTitle");
  const lastIsMovieLocal = localStorage.getItem("lastIsMovie");
  const lastSeasonLocal = localStorage.getItem("lastSeason");
  const lastEpisodeLocal = localStorage.getItem("lastEpisode");

  if (lastTitleLocal) {
    document.getElementById("showInput").value = lastTitleLocal;
  }

  if (lastIsMovieLocal === "true") {
    document.getElementById("modeToggle").checked = true;
    document.getElementById("seasonInput").classList.add("hidden");
    document.getElementById("episodeInput").classList.add("hidden");
  } else if (lastIsMovieLocal === "false") {
    document.getElementById("modeToggle").checked = false;
    if (lastSeasonLocal) {
      document.getElementById("seasonInput").value = lastSeasonLocal;
    }
    if (lastEpisodeLocal) {
      document.getElementById("episodeInput").value = lastEpisodeLocal;
    }
  }

  if (lastTitleLocal) {
    start();
  }

  const savedTheme = localStorage.getItem("theme");
  const showsSavedState = localStorage.getItem("showsShown");
  const moviesSavedState = localStorage.getItem("moviesShown");
  const quickFindSavedState = localStorage.getItem("quickFindShown");
  const permaAknow = localStorage.getItem("permaAknow");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  }
  if (savedTheme === "pink") {
    document.body.classList.add("pink");
    pinkThemeToggle.checked = true;
  }
  if (showsSavedState === "false") {
    document.getElementById("divchildshows").classList.add("hidden");
    document.getElementById("divchildshowtextparent").innerHTML = "shows (click) →";
    quickFindDivChildShowTextParentToggleVariable = 0;
  }
  if (moviesSavedState === "false") {
    document.getElementById("divchildmovies").classList.add("hidden");
    document.getElementById("divchildmovietextparent").innerHTML = "movies (click) →";
    quickFindDivChildMovieTextParentToggleVariable = 0;
  }
  if (quickFindSavedState === "false") {
    document.getElementById("quickFindOptionsDiv").classList.add("hidden");
    quickFindToggleVariable = 0;
  }
  if (permaAknow === "true"){
    adblockCheck()
  }
});



