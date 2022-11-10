let getMovieFromApi = async function () {
    try {
        let response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films', {
        method: 'GET',
        headers: {
            'X-API-KEY': '504e5c67-96d1-4845-8652-e641baa5d131',
            'Content-Type': 'application/json',
        },
        })
        .then(promise => promise.json())
        .then(data => data.items)

        return response
    }
    catch {
        alert("Server is not defined");
    }
}

const MOVIES = getMovieFromApi();