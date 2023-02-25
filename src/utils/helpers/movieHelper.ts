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

  getFavoriteMovie: async (SupabaseClient:SupabaseClient, userId:string) => {
    const response = await SupabaseClient.from('FavoriteMovie')
    .select()
    .eq('user_id',userId);
    return response;
  },

  checkIfMovieExistFavorite: async (SupabaseClient:SupabaseClient, userId:string, movieId:string) => {
    const response = await SupabaseClient
    .from('FavoriteMovie')
    .select('*', { count: 'exact', head: true })
    .eq('movieId', movieId)
    .eq('user_id', userId)

    return response;
  }
}

export default movieHelpers