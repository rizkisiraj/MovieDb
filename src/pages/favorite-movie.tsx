import { Box } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MovieList } from "../components/modules/movie-list/movieList.component";
import movieHelpers from "../utils/helpers/movieHelper";


const FavoriteMovie = () => {

    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [data, setData] = useState([]);

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
      const getFavoriteMovieData = async () => {
          if(user) {
              const response = await movieHelpers.getFavoriteMovie(supabaseClient, user.id);
              if( response.error ) {
                setData([])
              } else {
                const dataDump = convertSupabaseDataToMovieObject(response.data);
                setData(dataDump);
              }
          }
      }

      getFavoriteMovieData();
    },[user])

    return (
      <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Box as="main">
        <MovieList type='full'
        movies={data}
        sectionTitle="Popular Movies" />
      </Box>
      </>
    )
}

export default FavoriteMovie;