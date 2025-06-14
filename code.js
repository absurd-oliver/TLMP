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

// Optional: hide season/episode inputs when in Movie mode
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
    document.getElementById("youtubeResults").classList.add("light");
    document.localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    document.getElementById("youtubeResults").classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

let nextPageToken = null;
let currentQuery = "";
let isLoading = false;

const YOUTUBE_API_KEY = document.getElementById("userApiInput");

const apiKeyInput = document.getElementById("userApiInput");

// Load saved API key from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedKey = localStorage.getItem("youtubeApiKey");
  if (savedKey) {
    apiKeyInput.value = savedKey;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
  }
});

// Save API key to localStorage when user types
apiKeyInput.addEventListener("input", () => {
  localStorage.setItem("youtubeApiKey", apiKeyInput.value.trim());
});

const loadingIndicator = document.getElementById("youtubeLoading");

async function searchYouTube(initial = true) {
  const resultsContainer = document.getElementById("youtubeResults");
  const apiKey = document.getElementById("userApiInput").value.trim();

  if (!apiKey) {
    alert("Please enter your YouTube Data API key.");
    return;
  }

  if (initial) {
    currentQuery = document.getElementById("youtubeSearch").value.trim();
    resultsContainer.innerHTML = ""; // Clear old results
    nextPageToken = null;
  }

  if (!currentQuery || isLoading) return;

  isLoading = true;
  loadingIndicator.style.display = "block";

  const apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
    currentQuery
  )}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;

  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    nextPageToken = data.nextPageToken || null;
    isLoading = false;
    loadingIndicator.style.display = "none";

    if (!data.items || data.items.length === 0) {
      if (initial) resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    data.items.forEach((item) => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;
      const channel = item.snippet.channelTitle;

      const resultDiv = document.createElement("div");
      resultDiv.className = "youtube-result";
      resultDiv.style =
        "cursor: pointer; display: flex; align-items: center; gap: 15px; margin-bottom: 15px;";

      resultDiv.innerHTML = `
          <img src="${thumbnail}" alt="Thumbnail" width="160" height="90" style="border-radius: 8px;">
          <div>
            <strong>${title}</strong><br>
            <small>${channel}</small>
          </div>
        `;

      resultDiv.onclick = () => {
        document.getElementById(
          "youtubePlayer"
        ).src = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById("youtubeTitle").innerText = title;
        window.scrollTo({
          top: document.getElementById("youtubePlayer").offsetTop,
          behavior: "smooth",
        });
      };

      resultsContainer.appendChild(resultDiv);
    });
  } catch (err) {
    console.error(err);
    isLoading = false;
    loadingIndicator.style.display = "none";
    if (initial)
      resultsContainer.innerHTML = "<p>Error loading search results.</p>";
  }
}

document
  .getElementById("youtubeResults")
  .addEventListener("scroll", function () {
    const container = this;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50
    ) {
      // Near bottom
      searchYouTube(false);
    }
  });

let scrollTimeout;
document
  .getElementById("youtubeResults")
  .addEventListener("scroll", function () {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const container = this;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50
      ) {
        searchYouTube(false);
      }
    }, 150);
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