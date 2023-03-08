import { Box, Text, Divider, Skeleton, Flex, AspectRatio, Image, Button, SkeletonText, HStack, Grid, SkeletonCircle } from '@chakra-ui/react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieDetails from '../../components/elements/movie-details/movie-details.component';
import MovieTabs from '../../components/elements/movie-tabs/movie-tabs.component';
import MovieSkeleton from '../../components/layouts/movie-skeleton.component';
import API_ENDPOINT from '../../utils/api-endpoints/API_ENDPOINT';

const fetcher = (url:string) => fetch(url).then(res => res.json());

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data:movieData, error:movieError }= useSWR(id ? API_ENDPOINT.GET_MOVIE_DETAILS(id) : null, fetcher);
  const { data:creditsData, error:creditsError } = useSWR(id ? API_ENDPOINT.GET_MOVIE_CAST(id) : null, fetcher);

  return (
    <>
    <Head>
      <title>{movieData ? movieData.title : 'Loading...'}</title>
    </Head>
    {
      movieError & creditsError ? <Text>Error bang</Text> : 
      (!movieData || !creditsData ? <MovieSkeleton /> : 
      <MovieDetails movie={movieData}>
        <MovieTabs crews={creditsData.crew} casts={creditsData.cast} />
      </MovieDetails>
      )
    }
    </>
  )
}

export default MoviePage;