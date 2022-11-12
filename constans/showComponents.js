let favoritesBtn = document.querySelector('.header__favorites'),
    moviesBtn = document.querySelector('.header__movies');

favoritesBtn.addEventListener('click', () => {
    ROOT_MOVIES.style.display = 'none';
    ROOT_FAVORITES.style.display = 'block';
    ROOT_FAVORITES.style.display = 'flex';
});

moviesBtn.addEventListener('click', () => {
    ROOT_FAVORITES.style.display = 'none';
    ROOT_MOVIES.style.display = 'block';
    ROOT_MOVIES.style.display = 'flex';
})