class LocalStorage {

    constructor() {
        this.keyName = 'movies';
    }

    getMovieFavorites() {
        const moviesLocalStorage = localStorage.getItem(this.keyName);
        if (moviesLocalStorage !== null) {
            return JSON.parse(moviesLocalStorage);
        }
        return [];
    }

    putMovieFavorites(movie) {
        let movies = this.getMovieFavorites();

        movies.push(movie);

        localStorage.setItem(this.keyName, JSON.stringify(movies));
    }

    delMovieFavorites(movie) {
        let movies = this.getMovieFavorites();

        let filterMovies = movies.filter( item => {
            return item.value.kinopoiskId != movie
        });

        movies = filterMovies;

        localStorage.setItem(this.keyName, JSON.stringify(movies));
    }
}

const movieLocalStorage = new LocalStorage();