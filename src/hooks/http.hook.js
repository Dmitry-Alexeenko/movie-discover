import {useState, useCallback} from 'react'
import * as axios from "axios/index"

const instance = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3/",
    }
);

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (url) => {
        setIsLoading(true)
        try {
            let response = await instance.get(url)
            setIsLoading(false)
            return response.data

        } catch (e) {
            setIsLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    return { request, error, isLoading}
}