import { Box, Text, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MovieList } from "../components/modules/movie-list/movieList.component";
import SkeletonMovieList from "../components/modules/skeleton-movie-list/skeleton-movie-list.component";
import movieHelpers from "../utils/helpers/movieHelper";


const FavoriteMovie = () => {

    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const convertSupabaseDataToMovieObject = (dataArray:any[]) => {
      dataArray = dataArray.map(data => {
        return {
          id: data.movie_id,
          original_title: data.movie_title,
          vote_average: data.movie_rating,
          poster_path: data.movie_posterPath,
        }
      })
      
      return dataArray;
    }

    useEffect(() => {
      const getWatchlistMovieData = async () => {
          if(user) {
              const response = await movieHelpers.getWatchlistMovie(supabaseClient, user.id);
              if( response.error ) {
                console.log(response.error);
                setData([]);
              } else {
                const dataDump = convertSupabaseDataToMovieObject(response.data);
                setData(dataDump);
              }
          }
          setLoading(false);
      }

      getWatchlistMovieData();
    },[user])

    return (
      <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Box as="main" minH="72vh" w="full">
      {
        loading ? 
        <SkeletonMovieList /> : (!data.length ? <Text align="center">No movies on your watchlist</Text> : 
            <MovieList type='full'
            movies={data}
            sectionTitle="Watchlist Movies" />)
      }
      </Box>
      </>
    )
}

export default FavoriteMovie;