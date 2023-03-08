import { AspectRatio, Flex, Image, Box, Heading, Button, Text, Stack, IconButton, useToast, Skeleton } from "@chakra-ui/react";
import API_ENDPOINT from "../../../utils/api-endpoints/API_ENDPOINT";
import Movie from "../../../utils/interfaces/Movie";
import { BsFillBookmarkFill } from 'react-icons/bs';
import { MdOutlineFavorite } from 'react-icons/md';
import movieHelpers from "../../../utils/helpers/movieHelper";
import {  useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

const getYear = (date:string) => {
  return new Date(date).getFullYear()
}

const MovieDetails = ({ movie, children }:{ movie:Movie, children:any }) => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [isFavorite, setFavorite] = useState(false);
    const [isWatchlist, setWatchlist] = useState(false);

    useEffect(() => {
      setLoading(true);
      const checkIfMovieOnList = async () => {

        if( !user ) {
          setFavorite(false);
          setWatchlist(false);
          setLoading(false);
          return
        }

        const favoriteResponse = await movieHelpers.checkIfFavoriteMovieExist(supabaseClient,user.id,movie.id);
        const watchlistResponse = await movieHelpers.checkIfWatchlistMovieExist(supabaseClient,user.id,movie.id);

        if(!favoriteResponse.error && favoriteResponse.count > 0) {
          setFavorite(true);
        }

        if(!watchlistResponse.error && watchlistResponse.count > 0) {
          setWatchlist(true);
        }

        setLoading(false);
      }

      checkIfMovieOnList();
    },[])

    const onFavoriteHandler = async (callback:any) => {
      if( !user) {
        toast({
          status: 'warning',
          title: 'You must login first',
          isClosable: true
        })
        return;
      }

      if(isFavorite) {
        const response = await movieHelpers.removeFavoriteMovie(supabaseClient, user.id, movie.id);
        if(response.error) {
          console.log(response.error);
        } else {
          setFavorite(false);
          toast({
            status: 'success',
            title: 'remove from favorite',
            isClosable: true
          });
        }
        return;
      }

      const response = await callback(supabaseClient, movie, user.id);

      if( response.error ) {
        console.log(response.error);
        return;
      }

      setFavorite(true);
      toast({
        status: 'success',
        title: 'added to favorite',
        isClosable: true
      });
    }

    const onWatchlistHandler = async (callback:any) => {
      if( !user) {
        toast({
          status: 'warning',
          title: 'You must login first',
          isClosable: true
        })
        return
      }

      if(isWatchlist) {
        const response = await movieHelpers.removeWatchlistMovie(supabaseClient, user.id, movie.id);
        if(response.error) {
          console.log(response.error);
        } else {
          setWatchlist(false);
          toast({
            status: 'success',
            title: 'remove from watchlist',
            isClosable: true
          });
        }
        return;
      }

      const response = await callback(supabaseClient, movie, user.id);

      if ( response.error ) {
        console.log(response.error);
        return;
      }

      setWatchlist(true);
      toast({
        status: 'success',
        title: 'added to watchlist',
        isClosable: true
      });
    }

    return (
      <>
      <Flex direction={{base: "column", sm:"row"}} paddingX={{base:"8" ,sm:"16"}} as="main" w="100%" paddingY="8px" gap="64px">
        <Box height="fit-content" position={{sm:"sticky"}} top="10px" minW="300px">
          <AspectRatio w="100%" ratio={3 / 4} mb="16px">
            <Image borderRadius="20px" src={API_ENDPOINT.GET_MOVIE_IMAGE(movie.poster_path)} fallbackSrc="https://via.placeholder.com/300x400" alt="naruto" objectFit="cover" />
          </AspectRatio>
          <Button w="100%" variant="solid" colorScheme="teal">Watch Trailer</Button>
        </Box>
        <Flex direction="column" justifyContent="center" gap="16px">
          <Heading as="h2" size="lg" >{movie.title}<span style={{fontWeight: 'normal'}}>({getYear(movie.release_date)})</span></Heading>
          <Stack direction={['column', 'row']}>
            <Button isDisabled={isLoading} colorScheme="teal" rightIcon={<MdOutlineFavorite />} onClick={async () => onFavoriteHandler(movieHelpers.addMovieToFavorite)}>{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</Button>
            <Button isDisabled={isLoading} colorScheme="teal" rightIcon={<BsFillBookmarkFill />} onClick={async () => onWatchlistHandler(movieHelpers.addMovieToWatchlist)}>{isWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}</Button>
          </Stack>
          <Text fontStyle="italic" color="teal">{movie.tagline}</Text>
          <Box as="section">
            <Heading mb="8px" as="h2" size="md">STORYLINE</Heading>
            <Text w={{base: "100%" ,md:"70%"}}>{movie.overview}</Text>
          </Box>
          <Box as="aside">
            <Text><span style={{fontWeight: 'bold'}}>RATING</span> : {movie.vote_average}</Text>
            <Text><span style={{fontWeight: 'bold'}}>GENRES</span> : {movie.genres.map(genre => genre.name).join(",")}</Text>
            <Text><span style={{fontWeight: 'bold'}}>RUNTIME</span> : {movie.runtime} Minutes</Text>
          </Box>
          { children }
        </Flex>
      </Flex>
      </>
    )
}

export default MovieDetails;