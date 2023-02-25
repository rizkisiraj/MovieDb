import { Box } from "@chakra-ui/react"
import { MovieList } from "../components/modules/movie-list/movieList.component";
import Movie from "../utils/interfaces/Movie";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Api_helpers from "../utils/api-endpoints/api_helpers";

type MovieResponse = {
  results:Movie[]
}

export const getStaticProps: GetStaticProps<{ movies:Movie[] }> = async () => {
try {
    const response:MovieResponse = await Api_helpers.getUpcomingMovies();
    const movies:Movie[] = response.results;
  
    return {
      props: {
        movies,
      }
    }
} catch(e) {
    console.log(e);
}
}

const PopularMovies = ({ movies }: InferGetStaticPropsType<typeof getStaticProps>) => { 

  return (
    <>
    <Head>
        <title>Upcoming Movies</title>
    </Head>
    <Box as="main">
      <MovieList type='full' movies={movies} sectionTitle="Upcoming Movies" />
    </Box>
    </>
  )
}

export default PopularMovies;