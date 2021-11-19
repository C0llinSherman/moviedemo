// Featured and Searched Render
let heartState = '';
let trendingHTML = `<div class="android-more-section
">
<div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
<div class="android-card-container mdl-grid">`;
function render(data) {
	endlessScroll = true;
	currentRender = 'trending'
	if (data.errors || data.results.length == 0) {
		document.getElementById('movieCards').innerHTML = `<p id="noResults">Your query returned 0 results</p>`;
		return;
	}
	let imageSource = ``;
	for (let i = 0; i < data.results.length; i++) {
		if (data.results[i].poster_path == null) {
			imageSource = 'default-movie.png';
		} else {
			imageSource = `https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}`;
		}
		trendingHTML += `
            <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
              <img src="${imageSource}">
              </div>
              <div class="mdl-card__title">
                <h4 class="mdl-card__title-text">${data.results[i].original_title}</h4>
              </div>
              <div class="mdl-card__supporting-text">
              <div class="mask2"></div>
                <span class="mdl-typography--font-light mdl-typography--subhead">${data.results[i].overview}</span>
              </div>
              <div class="mdl-card__actions">
                <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="details.html" onclick="saveID(${data
				.results[i].id})">
                  More Details
                </a>`;
		for (let j = 0; j < savedMovies.length; j++) {
			if (data.results[i].id == savedMovies[j].id) {
				heartState = `<i class="fa-solid fa-heart active" onclick="saveMovie(${data.results[i].id})"></i>`;
				break;
			} else {
				heartState = `<i class="fa-solid fa-heart" onclick="saveMovie(${data.results[i].id})"></i>`;
			}
		}
		if (heartState == '') {
			trendingHTML += `<i class="fa-solid fa-heart" onclick="saveMovie(${data.results[i].id})"></i>`;
		} else {
			trendingHTML += heartState;
		}
		trendingHTML += `</div>
            </div>
              `;
	}
	document.getElementById('movieCards').innerHTML = trendingHTML;
	document.querySelectorAll('#movieCards i').forEach((heart) => {
		heart.addEventListener('click', () => {
			heart.classList.add('active');
		});
	});
}
// Render More Pages
function loadMore() {
	if (endlessScroll == true) {
		pageNum += 1;
		if (currentRender == 'trending') {
			trendingMovies(render);
		} else if (currentRender == 'search') {
			movieSearch(render);
		}
	}
}
//Saved Movies Render
function savedAPICall() {
	endlessScroll = false;
	let imageSource = ``;
	// fix for last hearted movie not being deleted
	if (savedMovies.length === 0) {
		document.getElementById('movieCards').innerHTML = '<p id = "noResults">You have 0 movies saved</p>';
		return;
	}
	for (let i = 0; i < savedMovies.length; i++) {
		currentSaved = savedMovies[i].id;
		savedMoviesRetrieve(savedMoviesRender);
	}
}
let savedHTML = '';
function savedMoviesRender(data) {
	let imageSource = '';
	if (data.poster_path === null) {
		imageSource = 'default-movie.png';
	} else {
		imageSource = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
		trendingHTML += `
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
      <div class="mdl-card__media">
      <img src="${imageSource}">
      </div>
      <div class="mdl-card__title">
      <h4 class="mdl-card__title-text">${data.original_title}</h4>
      </div>
      <div class="mdl-card__supporting-text">
      <div class='mask2'></div>
      <span class="mdl-typography--font-light mdl-typography--subhead">${data.overview}</span>
      </div>
      <div class="mdl-card__actions">
      <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="details.html" onclick="saveID(${data.id})">
      More Details
      </a>
      <i class="fa fa-trash-alt" onclick="deleteMovie(${data.id})"></i>
      </div>
      </div>
      `;
	}
	document.getElementById('movieCards').innerHTML = trendingHTML;
}
