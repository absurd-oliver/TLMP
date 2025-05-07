async function fetchImdbID(title, isMovie) {
  const apiKey = 'd0004590';
  const type = isMovie ? 'movie' : 'series';
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&type=${type}&apikey=${apiKey}`;
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
  const title = document.getElementById('showInput').value;
  const isMovie = document.getElementById('modeToggle').checked;
  const timestamp = new Date().getTime();

  try {
    const imdbID = await fetchImdbID(title, isMovie);
    const iframe = document.getElementById('showDisplay');

    if (isMovie) {
      iframe.src = `https://vidsrc.net/embed/movie?imdb=${imdbID}&t=${timestamp}`;
    } else {
      const season = document.getElementById('seasonInput').value;
      const episode = document.getElementById('episodeInput').value;
      iframe.src = `https://vidsrc.net/embed/tv?imdb=${imdbID}&season=${season}&episode=${episode}&t=${timestamp}`;
    }
  } catch (err) {
    console.error(err);
  }
}

// Optional: hide season/episode inputs when in Movie mode
document.getElementById('modeToggle').addEventListener('change', function () {
  const tvControls = document.getElementById('tvControls');
  tvControls.style.display = this.checked ? 'none' : 'block';
});

const themeToggle = document.getElementById('themeToggle');

// Apply saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggle.checked = true;
  }
});

// Toggle and store theme
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
});
