class Favorites {

    getMovieSoreForRender() {
        let moviesStore = movieLocalStorage.getMovieFavorites();
        if (moviesStore.length >= 0) {
            ROOT_FAVORITES.innerHTML = ''
            favoritesPage.render(moviesStore);
            favoritesPage.checkingLocalStorageBeforeRender(moviesStore);
            ROOT_HEADER.innerHTML = moviesStore.length;
        }
    }

    checkingLocalStorageBeforeRender(moviesStore) {
        MOVIES.then((result) => {
            let resultArr = Object.entries(result).map(([key, value]) => ({key,value}));

            resultArr.forEach(movie => {
                moviesStore.forEach(el => {
                    let activeEl = document.getElementById(`${movie.value.kinopoiskId}`);

                    if (activeEl.id == el.value.kinopoiskId) {
                        favoritesPage.createNewBtnForDelete(activeEl);
                    }
                })
            })
        });
    }

    createNewBtnForDelete(elemHtml) {
        elemHtml.classList.remove('active');
        elemHtml.nextElementSibling.classList.add('active');
    }

    render(moviesStore) {

        moviesStore.forEach(item => {
            let htmlFavorites = 
            `
                    <div class="favorites-content">
                        <img src="${item.value.posterUrl}" class="movies-content__img">
                        <div class="favorites-content__text">${item.value.nameRu}</div>
                        <div class="favorites-content__text">Рейтинг Imdb: ${item.value.ratingImdb}</div>
                        <div class="favorites-content__text">Рейтинг Кинопоиска: ${item.value.ratingKinopoisk}</div>
                        <div class="favorites-content__text">Жанры: ${item.value.genres[0].genre}</div>
                        <button class="favorites-content__btn-del" id="${item.value.kinopoiskId}">Удалить из избранного</button>
                    </div>
            `;
            ROOT_FAVORITES.innerHTML += htmlFavorites;
        });
    }
}

const favoritesPage = new (Favorites);
favoritesPage.getMovieSoreForRender();

window.addEventListener('click', (e) => {
    if (e.target.className === 'movies-content__btn active') {
        MOVIES.then((result) => {
            let resultArr = Object.entries(result).map(([key, value]) => ({key,value}));

            resultArr.forEach(movie => {
                if (movie.value.kinopoiskId == e.target.id) {
                    movieLocalStorage.putMovieFavorites(movie);
                    favoritesPage.getMovieSoreForRender();
                }
            })
        });
    }

    favoritesPage.createNewBtnForDelete(e.target);
})

window.addEventListener('click', (e) => {

    if ( (e.target.className === 'favorites-content__btn-del' || (e.target.className === 'auxiliary-btn'))) {

        if (e.target.className === 'auxiliary-btn') {
            e.target.previousElementSibling.classList.add('active')
            e.target.classList.remove('active');
        }

        if (e.target.className === 'favorites-content__btn-del') {

            MOVIES.then((result) => {
                let resultArr = Object.entries(result).map(([key, value]) => ({key,value}));
    
                resultArr.forEach(el => {
                    let activeEl = document.getElementById(`${el.value.kinopoiskId}`);
                    if (e.target.id == el.value.kinopoiskId) {
                        activeEl.classList.add('active')
                        activeEl.nextElementSibling.classList.remove('active');
                    }
                })
            });
        }

        MOVIES.then((result) => {
            let resultArr = Object.entries(result).map(([key, value]) => ({key,value}));

            resultArr.forEach(movie => {
                if (movie.value.kinopoiskId == e.target.id) {
                    movieLocalStorage.delMovieFavorites(movie.value.kinopoiskId);
                    favoritesPage.getMovieSoreForRender();
                }
            })
        });
    }

});