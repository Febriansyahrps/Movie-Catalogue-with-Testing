import { itActAsFavoriteMovieModel } from './contract/favoriteMovieContract';

let favoriteMovies = [];

const FavoriteMovieArray = {
  getMovie(id) {
    if (!id) {
      return;
    }

    return favoriteMovies.find((movie) => movie.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!movie.hasOwnProperty('id')) {
      return;
    }
    if (this.getMovie(movie.id)) {
      return;
    }
    favoriteMovies.push(movie);
  },

  deleteMovie(id) {
    // cara boros menghapus film dg cara mengcopy film yang ada
    // kecuali film dg id == id
    favoriteMovies = favoriteMovies.filter((movie) => movie.id !== id);
  },

  searchMovies(query) {
    return this.getAllMovies()
      .filter((movie) => {
        const loweredCaseMovieTitle = (movie.title || '-').toLowerCase();
        const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedMovieTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('favorite Movie array contract test implementation', () => {
  afterEach(() => favoriteMovies = []);

  itActAsFavoriteMovieModel(FavoriteMovieArray);
});
