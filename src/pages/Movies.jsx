import React, {useEffect, useCallback, useReducer} from 'react'
import {useHistory, Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook"
import {insertUrlParams, movie, urls} from "../commin/urls";
import {initialState, reducer} from "../commin/reducer";

export const Movies = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory()
    const {request} = useHttp()

    const fetchLinks = useCallback(async () => {
        try {
            const url = await insertUrlParams(urls.GET_MOVIES, state.currentPage, state.tag, state.selectedGenre)
            const moviesList = await request(url)
            const genresList = await request(urls.GET_GENRES)
            dispatch({
                type: 'GET_MOVIES', payload: {
                    currentPage: moviesList.page,
                    totalPages: moviesList.total_pages,
                    movies: [...moviesList.results]
                }
            })
            dispatch({
                type: 'GET_GENRES', payload: {
                    genres: [...genresList.genres]
                }
            })
        } catch (e) {
        }
    }, [state.selectedGenre, state.tag])

    useEffect(() => {
        fetchLinks()
    }, [state.selectedGenre, state.tag])

    console.log(state, "state_state_state")

    const clickHandler = async () => {
        try {
            const url = await insertUrlParams(urls.GET_MOVIES, state.currentPage + 1, state.tag, state.selectedGenre)
            const moviesList = await request(url)
            dispatch({
                type: 'GET_MOVIES', payload: {
                    currentPage: state.currentPage + 1,
                    totalPages: moviesList.total_pages,
                    movies: [...moviesList.results]
                }
            })
        } catch (e) {
        }
    }

    const showMovieHandler = (id) => {
        history.push(`/movie/${id}`)
    }

    const selectGenreHandler = (id) => {
        dispatch({
            type: 'GET_MOVIES', payload: {
                selectedGenre: id
            }
        })
    }

    const selectTagHandler = (tag) => {
        dispatch({
            type: 'SELECT_TAG', payload: {
                tag: tag
            }
        })
    }

    const cardsOfMovies = state.movies.map((item, index) => (
        <div className="col  m4 l3 " key={index}>
            <div className="card">
                <div className="card-image cp" onClick={() => {
                    showMovieHandler(item.id)
                }}>
                    <img src={item.backdrop_path ? `http://image.tmdb.org/t/p/w342${item.backdrop_path}` : movie}/>
                </div>
                <div className="card-content h200">
                    <span className="card-title red-text">{item.title}</span>
                    <p className="card-content-text">{item.overview} </p>
                </div>
                <div className="card-action">
                    <Link to={`/movie/${item.id}`}>About movie</Link>
                </div>
            </div>
        </div>
    ))

    const genresList = state.genres.map((item, index) => (
        <div key={index} className='movies-tag-item'>
            <label>
                <input
                    type="checkbox"
                    className="filled-in"
                    checked={item.id === state.selectedGenre}
                    onClick={() => {
                        selectGenreHandler(item.id)
                    }}/>
                <span>{item.name}</span>
            </label>
        </div>
    ))

    return (
        <div>
            <div className="row">
                <div className='col p10 s12 '>
                    <div className='movies-radio-container'>

                        <form action="#" className='movies-genre-container'>
                            {genresList}
                        </form>

                        <form action="#" className='movies-tags-container'>
                            <div className='movies-tag-item'>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        checked={state.tag === 'popularity.desc'}
                                        onClick={() => {
                                            selectTagHandler('popularity.desc')
                                        }}/>
                                    <span>Popularity</span>
                                </label>
                            </div>
                            <div className='movies-tag-item'>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        checked={state.tag === 'release_date.desc'}
                                        onClick={() => {
                                            selectTagHandler('release_date.desc')
                                        }}/>
                                    <span>Release date</span>
                                </label>
                            </div>
                            <div className='movies-tag-item'>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        checked={state.tag === 'vote_average.desc'}
                                        onClick={() => {
                                            selectTagHandler('vote_average.desc')
                                        }}/>
                                    <span>Vote average</span>
                                </label>
                            </div>
                        </form>

                    </div>
                </div>
                {cardsOfMovies}
                <div className="col s12 movies-btn">
                    <a className="waves-effect waves-light btn" onClick={clickHandler}>more</a>
                </div>
            </div>
        </div>
    )
}