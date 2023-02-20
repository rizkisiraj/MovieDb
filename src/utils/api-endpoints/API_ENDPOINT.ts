import CONFIG_DATA from "../globals/CONFIG_DATA";

interface API_ENDPOINT_CONFIG {
  GET_POPULAR_MOVIES:string,
  GET_MOVIE_DETAILS:(id:any) => any,
  GET_UPCOMING_MOVIES:string,
  GET_MOVIE_IMAGE:(id:string) => string,
}

const API_ENDPOINT:API_ENDPOINT_CONFIG = {
  GET_POPULAR_MOVIES: `https://${CONFIG_DATA.URL}/movie/popular?api_key=${CONFIG_DATA.API_KEY}`,
  GET_MOVIE_DETAILS: (movieId) => `https://${CONFIG_DATA.URL}/movie/${movieId}?api_key=${CONFIG_DATA.API_KEY}`,
  GET_UPCOMING_MOVIES: `https://${CONFIG_DATA.URL}/movie/upcoming?api_key=${CONFIG_DATA.API_KEY}`,
  GET_MOVIE_IMAGE: (poster_path) => `https://image.tmdb.org/t/p/original/${poster_path}`
}

export default API_ENDPOINT;