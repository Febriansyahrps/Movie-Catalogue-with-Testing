import { createMovieItemTemplate } from "../../templates/template-creator";

class FavoriteMovieSearchView {
  getTemplate() {
    return `
      <div class="content">
      <h2 class="content__heading">Your Liked Movie</h2>
          <div id="movies" class="movies">
          <div id="query" />
          </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById("query").addEventListener("change", (event) => {
      callback(event.target.value);
    });
  }

  showMovies(movies) {
    this.showFavoriteMovies(movies);
  }

  showFavoriteMovies(movies = []) {
    let html;
    if (movies.length) {
      html = movies.reduce(
        (carry, movie) => carry.concat(createMovieItemTemplate(movie)),
        ""
      );
    } else {
      html = this._getEmptyMoviesTemplate();
    }
    document.getElementById("movies").innerHTML = html;

    document
      .getElementById("movies")
      .dispatchEvent(new Event("movies:updated"));
  }

  _getEmptyMoviesTemplate() {
    return '<div class="movie-item__not__found">Liked movie is empty</div>';
  }
}

export default FavoriteMovieSearchView;
