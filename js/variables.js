//Initialized Variables
let movieSearchQuery = '';
let pageNum = 1;
let apiKey = `00d9cfd2d63643eb08d2411d55b3a170`;
let heading = 'Featured Movies';
let movie_id = ``;
let currentRender = '';
let endlessScroll = true;
let currentSaved


//Saved Movies
let savedMovies = [];
const SAVEDMOVIES = 'savedMovies'
const existingSaved = retrieve();
if (existingSaved) {
    savedMovies = existingSaved
}
function save() {
    localStorage.setItem(SAVEDMOVIES, JSON.stringify(savedMovies));
}
function retrieve() {
    return JSON.parse(localStorage.getItem(SAVEDMOVIES))
}