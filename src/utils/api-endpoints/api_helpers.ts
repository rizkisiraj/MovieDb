import API_ENDPOINT from "./API_ENDPOINT"

const Api_helpers = {
  getPopularMovies: async () => {
    const res = await fetch(API_ENDPOINT.GET_POPULAR_MOVIES);
    const data = await res.json();
    return data;
  },

  getUpcomingMovies: async () => {
    const res = await fetch(API_ENDPOINT.GET_UPCOMING_MOVIES);
    const data = await res.json();
    return data;
  }
}

export default Api_helpers;