export const movie = 'http://image.tmdb.org/t/p/w342/vt35SR1yNbT2NLP1eLdXiHZfi3i.jpg'
export const movie2 = 'http://image.tmdb.org/t/p/w780/vt35SR1yNbT2NLP1eLdXiHZfi3i.jpg'

export const urls = {
    GET_MOVIES: "discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&sort_by={SORT_BY}&page={PAGE}&with_genres={GENRE_ID}",
    GET_MOVIE_DETAILS: "movie/{MOVIE_ID}?api_key=4237669ebd35e8010beee2f55fd45546",
    GET_GENRES: "genre/movie/list?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US",
};

export const insertUrlParams = (urlTemplate, page, sortBy, genreId) => {
    return urlTemplate
        .replace("{PAGE}", toUrlParamString(page))
        .replace("{SORT_BY}", toUrlParamString(sortBy))
        .replace("{GENRE_ID}", toUrlParamString(genreId))
};

export const insertUrlParamsForMovie = (urlTemplate, movieId) => {
    return urlTemplate
        .replace("{MOVIE_ID}", toUrlParamString(movieId))
};


export const toUrlParamString = (value) => {
    if (value === 0)
        return "0";
    return value || "";
};