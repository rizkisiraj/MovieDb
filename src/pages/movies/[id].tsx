import { Box, Text, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import useSWR from 'swr'
import { SwiperGallery } from '../../components/elements/gallery/gallery.component';
import MovieDetails from '../../components/elements/movie-details/movie-details.component';
import API_ENDPOINT from '../../utils/api-endpoints/API_ENDPOINT';

const fetcher = (url:string) => fetch(url).then(res => res.json());

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data:movieData, error:movieError }= useSWR(id ? API_ENDPOINT.GET_MOVIE_DETAILS(id) : null, fetcher);
  const { data:creditsData, error:creditsError } = useSWR(id ? API_ENDPOINT.GET_MOVIE_CAST(id) : null, fetcher);

  return (
    <>
    {
      movieError ? <Text>Error bang</Text> : (!movieData ? <Text>Loading...</Text> : <MovieDetails movie={movieData} />)
    }
    <Box mt="14px" paddingX="16"> 
    {creditsError ? <Text>Error bang</Text> : (!creditsData ? <Text>Loading...</Text> : <SwiperGallery cast={creditsData.cast} />)}
    </Box>
    </>
  )
}

export default MoviePage;