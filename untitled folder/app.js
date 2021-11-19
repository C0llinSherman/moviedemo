function movieApiSearch(cb) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=00d9cfd2d63643eb08d2411d55b3a170&language=en-US&query=Harry%20Potter&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => cb(data));
}
movieApiSearch(getApi)

function getApi(data) {
    console.log(data)
}
