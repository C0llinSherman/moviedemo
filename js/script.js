//Search Event Listener
$('#search-field').keyup(function (event) {
  if (event.keyCode === 13) {
    $('#search').click();
  }
});
$('#search').click(function () {
  searchInput()
  window.location.href = 'search.html';
});

//Save Movie IDs and Querys
function saveID(id) {
  localStorage.setItem('MOVIEID', id);
  location.reload();
}
function saveMovieQuery(movieQuery) {
  localStorage.setItem("MOVIEQUERY", movieQuery)
}

// Featured Function
function resetFeatured() {
  endlessScroll = true;
  currentRender = `trending`;
  heading = 'Featured Movies';
  trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
  pageNum = 1;
  movieSearchQuery = document.getElementById('search-field').value.trim();
  trendingMovies(render);
}

//Search Function
function searchInput() {
  if (document.getElementById('search-field').value.trim() != '') {
    movieSearchQuery = document.getElementById('search-field').value.trim();
  }
  saveMovieQuery(movieSearchQuery);
}
function searchLoad() {
  currentRender = `search`;
  heading = 'Search Results';
  trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
  pageNum = 1;
  movieSearchQuery = localStorage.getItem('MOVIEQUERY');
  movieSearch(render);
}

//Save Function
function saveMovie(id) {
  if (savedMovies.length == 0) {
    savedMovies.push({ id });
  } else {
    for (let movie of savedMovies) {
      if (movie.id == id) {
        return;
      }
    }
    savedMovies.push({ id });
  }
  save();
}
function viewSaved() {
  heading = 'Saved Movies';
  trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
  savedAPICall();
}
function deleteMovie(id) {
  for (let i = 0; i < savedMovies.length; i++) {
    if (savedMovies[i].id == id) {
      savedMovies.splice(i, 1);
    }
  }
  trendingHTML = `<div class="android-more-section
  ">
  <div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
  <div class="android-card-container mdl-grid">`;
  save();
  savedAPICall();
}

// Back to Top Show/Hide
window.onscroll = function () {
  if (scrollY >= 1000) {
    document.getElementById('view-source').style.visibility = 'visible';
    document.getElementById('view-source').style.opacity = 1;
  } else {
    document.getElementById('view-source').style.visibility = 'hidden';
    document.getElementById('view-source').style.opacity = 0;
  }
};
//Endless Scroll
$(function () {
  let $win = $(window);
  $win.scroll(function () {
    if ($win.height() + $win.scrollTop() == $(document).height()) {
      loadMore();
    }
  });
});

