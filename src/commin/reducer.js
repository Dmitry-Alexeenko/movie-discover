export const initialState = {
    currentPage: 1,
    totalPages: null,
    genres: [],
    selectedGenre: '',
    tag: 'popularity.desc',
    movies: []
};

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_MOVIES':
            return {
                ...state,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                movies: [...state.movies, ...action.payload.movies],
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: [...action.payload.genres],
            }
        case 'SELECT_GENRE':
            return {
                ...state,
                selectedGenre: action.payload.selectedGenre,
            }
        case 'SELECT_TAG':
            return {
                ...state,
                tag: action.payload.tag,
            }
        default:
            return state
    }
}