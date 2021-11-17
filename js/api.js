// OnLoad
function trendingMovies(cb) {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${pageNum}`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
//OnSearch
function movieSearch(cb) {
    fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearchQuery}%20&page=${pageNum}&include_adult=false`
    )
        .then((response) => response.json())
        .then((data) => cb(data));
}
//SavedMovies
function savedMoviesRetrieve(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${currentSaved}?api_key=${apiKey}&language=en-US`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
//DetailsPage
function movieDetails(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
function movieVideos(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}&language=en-US`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
function movieCredits(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}&language=en-US`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
function releaseDate(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/release_dates?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
function similarMovies(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&page=1`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
function movieReviews(cb) {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${apiKey}&language=en-US&page=1`)
        .then((response) => response.json())
        .then((data) => cb(data));
}
