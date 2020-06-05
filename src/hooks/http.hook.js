import {useState, useCallback} from 'react'
import * as axios from "axios/index"
/*"https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1*/
const instance = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3/",

    }
);


export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)
        try {
            let response = await instance.get(url)

            setIsLoading(false)
            return response.data

            /*if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1*', {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что то пошло не так')
            }
            setIsLoading(false)


            return data*/

        } catch (e) {
            setIsLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    return { request, error, isLoading}
}