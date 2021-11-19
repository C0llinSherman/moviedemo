let heartState = '';
let trendingHTML = `<div class="android-more-section
">
<div class="android-section-title mdl-typography--display-1-color-contrast center">${heading}</div>
<div class="android-card-container mdl-grid">`;
function render(data) {
	endlessScroll = true;
	if (data.results == null) {
		document.getElementById('movieCards').innerHTML = `<p id="noResults">Your query returned 0 results</p>`;
		return;
	}
	let imageSource = ``;
	for (let i = 0; i < 20; i++) {
		if (data.results[i].poster_path === null) {
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
function viewDetails() {
	movie_id = localStorage.getItem('MOVIEID');
	movieDetails(detailsRender);
}
function detailsRender(data) {
	console.log(data);
	movie_id = localStorage.getItem('MOVIEID');
	endlessScroll = false;
	let detailsHTML = `<div class="android-wear-section" style = "background: url('https://image.tmdb.org/t/p/w500${data.backdrop_path}'); background-size: cover; background-position: center;">
    <div class="mask"></div>
    <div class="android-wear-band">
    <div id="trailer"></div>
      <div class="android-wear-band-text">
        <div class="mdl-typography--display-2 mdl-typography--font-thin">${data.original_title}</div>
        <div class="mdl-typography--display-1 mdl-typography--font-thin">Overview</div>
  
        <p id='overview'class="mdl-typography--headline mdl-typography--font-thin">
        ${data.overview}
        </p>
        <div class="mdl-typography--display-1 mdl-typography--font-thin">Your Rating</div>
        <p>
          <i class="far fa-star" data-num=0></i>
          <i class="far fa-star" data-num=1></i>
          <i class="far fa-star" data-num=2></i>
          <i class="far fa-star" data-num=3></i>
          <i class="far fa-star" data-num=4></i>
        </p>
      </div>
    </div>
  </div>
</div>
<h6>Cast</h6>
<div id = "cast" class="scrolling-wrapper"></div>
<h6>Similar Movies</h6>
<div id = "similar" class="scrolling-wrapper"></div>
<p id='commentTitle' class="mdl-typography--headline mdl-typography--font-thin">Comments</p>
<form id='comment'>
  <div class="mdl-textfield mdl-js-textfield">
    <input autocomplete='off' class="mdl-textfield__input" type="text" id="sample1" placeholder='Add a comment'>
    <input type="submit" value="Send">
  </div>

  </form>
  <div class='commentBox'>
  </div>`;
	document.getElementById('movieCards').innerHTML = detailsHTML;
	movieVideos(insertTrailer);
	movieCredits(insertCast);
	similarMovies(insertSimilarMovies);
	// listen to enter or clicking the send button for comments
	document.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();
		// input validaion
		const input = document.querySelector('.mdl-js-textfield input');
		if (input.value.trim() == '' || input.value === 'Enter Something...') {
			input.value = 'Enter Something...';
			setTimeout(() => {
				input.value = '';
			}, 1000);
			return;
		}
		// save user input to local storage
		saveComments();
		// renders comments after user event
		renderComments();
	});
	// Select and add event listener to all stars on details page
	// calls save and render function for each event
	document.querySelectorAll('.android-wear-section i').forEach((star) => {
		star.addEventListener('click', (e) => {
			// assigns rating the data dash of the target element aka the element that was clicked
			let rating = e.target.dataset.num;
			saveRating(rating);
			renderRating();
		});
	});
	// renders rating onload
	renderRating();
	// renders comments onload
	renderComments();
}
function insertCast(data) {
	let castHTML = '';
	let imageSource = ``;

	for (let i = 0; i < data.cast.length; i++) {
		if (data.cast[i].profile_path !== null) {
			imageSource = `https://image.tmdb.org/t/p/w500/${data.cast[i].profile_path}`;
			castHTML += `<div class="card">
		  <img src="${imageSource}">
		  <p>${data.cast[i].name}</p>
		  
	  </div>`;
		}
	}
	document.getElementById('cast').innerHTML = castHTML;
}
function insertSimilarMovies(data) {
	let castHTML = '';
	for (let i = 0; i < data.results.length; i++) {
		castHTML += `<div onclick = 'saveID(${data.results[i].id})' class="card">
      <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}">
     
      
  </div>`;
		document.getElementById('similar').innerHTML = castHTML;
	}
}
function insertTrailer(data) {
	let trailerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0]
		.key}" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
	document.getElementById('trailer').innerHTML = trailerHTML;
}
// function to render user rating from local storage
function renderRating() {
	for (let movie of savedMovies) {
		if (movie.id == movie_id) {
			document.querySelectorAll('.android-wear-section i').forEach((star) => {
				star.classList.remove('liked');
			});
			let stars = document.querySelectorAll('.android-wear-section i');
			stars = Array.from(stars);
			for (let i = 0; i <= movie.rating; i++) {
				stars[i].classList.add('liked');
			}
		}
	}
}
// function to save user rating from local storage
function saveRating(rating) {
	for (let movie of savedMovies) {
		// checks to see if movie id in array is the same as the current movie details id
		if (movie.id == movie_id) {
			// if there is a movie id in the array that matches the current movie details id
			// this if else checks if comments have been made to the movie
			movie.rating = rating;
			save();
			return;
		}
	}
	// if the function makes it to here it means there isn't a movie with the same id in the array
	// therefore we made our own object and push it the current movie id and the input value from the user
	savedMovies.push({ id: Number(movie_id), rating: rating });
	save();
}

// function to save user comment to local storage
function saveComments() {
	// grabs value from user
	const input = document.querySelector('.mdl-js-textfield input');
	// loop through all of the movies that are saved in the array savedMovies
	for (let movie of savedMovies) {
		// checks to see if movie id in array is the same as the current movie details id
		if (movie.id == movie_id) {
			// if there is a movie id in the array that matches the current movie details id
			// this if else checks if comments have been made to the movie
			if (!movie.hasOwnProperty('comments')) {
				movie.comments = [input.value];
				input.value = '';
				save();
				return;
			} else {
				movie.comments.push(input.value);
				input.value = '';
				save();
				return;
			}
		}
	}
	// if the function makes it to here it means there isn't a movie with the same id in the array
	// therefore we made our own object and push it the current movie id and the input value from the user
	savedMovies.push({ id: Number(movie_id), comments: [input.value] });
	input.value = '';
	save();
}

// function to render user comments from local storage
function renderComments() {
	const commentBox = document.querySelector('.commentBox');
	for (let movie of savedMovies) {
		if (movie.id == movie_id) {
			commentBox.innerHTML = '';
			for (let comment of movie.comments) {
				const p = document.createElement('p');
				p.innerText = comment;
				commentBox.append(p);
			}
		}
	}
}

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
