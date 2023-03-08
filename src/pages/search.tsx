import { Box } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head";
import { useRouter } from "next/router"
import { MovieList } from "../components/modules/movie-list/movieList.component";
import Api_helpers from "../utils/api-endpoints/api_helpers";
import movieHelpers from "../utils/helpers/movieHelper";
import Movie from "../utils/interfaces/Movie"

export const getServerSideProps: GetServerSideProps<{ queryMovies: Movie[], name:any }> = async (context) => {
    const { query } = context;
    let queryList = await Api_helpers.getKeywords(query.name);
    if(queryList.results.length) {
        queryList = queryList.results.map(query => query.id).join('|');
        const queryMovies = await Api_helpers.getMoviesByKeywords(queryList);
    
        return {
          props: {
            queryMovies: queryMovies.results,
            name: query.name,
          },
        }
    }

    return {
        props: {
          queryMovies: [],
          name: 'no results',
        },
      }

  }

const Search = ({ queryMovies, name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Box as="main">
        <MovieList type='full' movies={queryMovies} sectionTitle="Popular Movies" />
      </Box>
    </>
  )
}

export default Search;