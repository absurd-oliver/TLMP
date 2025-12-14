export const $ = (id) => document.getElementById(id);

export const els = {
  show: $("showInput"),
  season: $("seasonInput"),
  episode: $("episodeInput"),
  iframe: $("showDisplay"),
  mode: $("modeToggle"),
  tvControls: $("tvControls"),

  themeLight: $("themeToggle"),
  themePink: $("themeTogglePink"),

  quickFind: $("quickFindOptionsDiv"),
  shows: $("divchildshows"),
  movies: $("divchildmovies"),
  showsBtn: $("divchildshowtextparent"),
  moviesBtn: $("divchildmovietextparent"),

  fontSelect: $("fontSelect"),
};
