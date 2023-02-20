import useSWR from 'swr'
import API_ENDPOINT from '../api-endpoints/API_ENDPOINT'

const fetcher = (...urls:string[]) => {
    const f = (url:string) => fetch(url).then(r => r.json())
    return Promise.all(urls.map(url => f(url)))
}
  
export default function useMultipleRequests(id:string | string[]) {
  const urls = [API_ENDPOINT.GET_MOVIE_CAST(id), API_ENDPOINT.GET_MOVIE_DETAILS(id)]
  const { data, error } = useSWR(urls, fetcher)
  return {
    data: data,
    isError: !!error,
    isLoading: !data && !error
  }
}