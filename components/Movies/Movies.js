class Movies {

    render() {
        MOVIES.then((result) => {
            let resultArr = Object.entries(result).map(([key, value]) => ({key,value}));

            resultArr.forEach( el => {
                let htmlMovies = 
                `
                    <div class="movies-content">
                        <img src="${el.value.posterUrl}" class="movies-content__img">
                        <div class="movies-content__text">
                            <p>${el.value.nameRu}</p>
                        </div>
                        <button class="movies-content__btn" id="${el.value.kinopoiskId}">Добавить в избранное</button>
                    </div>
                `;
                ROOT_MOVIES.innerHTML += htmlMovies;
            })
        });
    }
}

const moviePage = new Movies();
moviePage.render();