import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from "react-router-dom";
import {insertUrlParamsForMovie, movie2, urls} from "../commin/urls";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const Movie = () => {
    const history = useHistory()
    const {request, isLoading} = useHttp()
    const params = useParams()
    const movie_id = params.id

    const [movieDetails, setMovieDetails] = useState({})

    const fetchLinks = useCallback(async () => {
        try {
            const url = await insertUrlParamsForMovie(urls.GET_MOVIE_DETAILS, movie_id)
            const fetched = await request(url)
            setMovieDetails({...fetched})
        } catch (e) {
        }}, [])

    useEffect(() => {
        fetchLinks()
    }, [])

    const goBack = () => {
        history.goBack(-1)
    }

    if (isLoading) {
        return <Loader/>
    }
    return (
        <div>
            {movieDetails.id && <div className='container'>
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card">
                            <div className="card-image">
                                <img src={movieDetails.backdrop_path ? `http://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`: movie2}/>
                            </div>
                            <div className="card-content">
                                <span className="card-title red-text">{movieDetails.title}</span>
                                <p>{movieDetails.overview} </p>
                                <p className={'p10'}>
                                    <span className=" green-text">Status: {movieDetails.status}</span>
                                </p>

                                <table>
                                    <thead>
                                    <tr>
                                        <th>Home page</th>
                                        <th>Popularity</th>
                                        <th>Vote average</th>
                                        <th>Vote count</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>{movieDetails.homepage}</td>
                                        <td>{movieDetails.popularity}</td>
                                        <td>{movieDetails.vote_average}</td>
                                        <td>{movieDetails.vote_count}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-action">
                                <a className='cp' onClick={goBack}>go back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

    </div>

    )
}