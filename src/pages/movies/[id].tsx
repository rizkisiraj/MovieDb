import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import useSWR from 'swr'
import MovieDetails from '../../components/elements/movie-details/movie-details.component';
import API_ENDPOINT from '../../utils/api-endpoints/API_ENDPOINT';

const fetcher = (url:string) => fetch(url).then(res => res.json());

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? API_ENDPOINT.GET_MOVIE_DETAILS(id) : null, fetcher);
  if(error) {
    return <Text>Error bang</Text>;
  }

  if(!data) {
    return <Text>Loading</Text>;
  }

  return (
    <>
    <MovieDetails movie={data} />
    </>
  )
}

export default MoviePage;