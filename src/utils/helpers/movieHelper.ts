import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import Movie from "../interfaces/Movie";

const movieHelpers = {
  addMovieToFavorite: async (supabaseClient:SupabaseClient, movie:Movie, userId:string) => {
    const response = await supabaseClient.from('FavoriteMovie')
    .insert({ 
      user_id:userId, 
      movie_id:movie.id, 
      movie_title:movie.original_title, 
      movie_rating:movie.vote_average,
      movie_posterPath:movie.poster_path,
    });

    return response;
  },

  addMovieToWatchlist: async (supabaseClient:SupabaseClient, movie:Movie, userId:string) => {
    const response = await supabaseClient.from('WatchlistMovie')
    .insert({ 
      user_id:userId, 
      movie_id:movie.id, 
      movie_title:movie.original_title, 
      movie_rating:movie.vote_average,
      movie_posterPath:movie.poster_path,
    });

    return response;
  },

  getFavoriteMovie: async (SupabaseClient:SupabaseClient, userId:string) => {
    const response = await SupabaseClient.from('FavoriteMovie')
    .select()
    .eq('user_id',userId);
    return response;
  },

  getWatchlistMovie: async (SupabaseClient:SupabaseClient, userId:string) => {
    const response = await SupabaseClient.from('WatchlistMovie')
    .select()
    .eq('user_id',userId);
    return response;
  },

  checkIfFavoriteMovieExist: async (SupabaseClient:SupabaseClient, userId:string, movieId:number) => {
    const response = await SupabaseClient
    .from('FavoriteMovie')
    .select('*', { count: 'exact', head: true })
    .eq('movie_id', movieId)
    .eq('user_id', userId)

    return response;
  },

  checkIfWatchlistMovieExist: async (SupabaseClient:SupabaseClient, userId:string, movieId:number) => {
    const response = await SupabaseClient
    .from('WatchlistMovie')
    .select('*', { count: 'exact', head: true })
    .eq('movie_id', movieId)
    .eq('user_id', userId)

    return response;
  },

  removeFavoriteMovie: async (SupabaseClient:SupabaseClient, userId:string, movieId:number) => {
    const response = await SupabaseClient
    .from('FavoriteMovie')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId)

    return response;
  },

  removeWatchlistMovie: async (SupabaseClient:SupabaseClient, userId:string, movieId:number) => {
    const response = await SupabaseClient
    .from('WatchlistMovie')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId)

    return response;
  },
}

export default movieHelpers