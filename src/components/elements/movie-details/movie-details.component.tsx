import { AspectRatio, Flex, Image, Box, Heading, Button, Text, HStack, IconButton } from "@chakra-ui/react";
import API_ENDPOINT from "../../../utils/api-endpoints/API_ENDPOINT";
import Movie from "../../../utils/interfaces/Movie";
import { BsFillBookmarkFill } from 'react-icons/bs';
import { MdOutlineFavorite } from 'react-icons/md';
import movieHelpers from "../../../utils/helpers/movieHelper";
import {  useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const getYear = (date:string) => {
  return new Date(date).getFullYear()
}

const MovieDetails = ({ movie, children }:{ movie:Movie, children:any }) => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [isLoading, setLoading] = useState(false);
    const [isFavorite, setFavorite] = useState(false);

    useEffect(() => {
      setLoading(true);
      const checkFavoriteMovie = async () => {
        const response = await movieHelpers.checkIfFavoriteMovieExist(supabaseClient,user.id,movie.id);
        if(!response.error && response.count > 0) {
          setFavorite(true);
        }
        setLoading(false);
      }

      checkFavoriteMovie();
    },[])

    const onClickHandler = async (callback:any) => {
      if( !user.id) {
        return
      }

      if(isFavorite) {
        const response = await movieHelpers.removeFavoriteMovie(supabaseClient, user.id, movie.id);
        if(response.error) {
          console.log(response.error);
        } else {
          setFavorite(false);
        }
        return;
      }

      const response = await callback(supabaseClient, movie, user.id);

      if( response.error ) {
        console.log(response.error);
        return;
      }

      setFavorite(true);
    }

    return (
      <>
      <Flex padding="16" as="main" w="100%" paddingY="16px" gap="64px">
        <Box height="fit-content" position="sticky" top="10px" minW="300px">
          <AspectRatio w="100%" ratio={3 / 4} mb="16px">
            <Image borderRadius="20px" src={API_ENDPOINT.GET_MOVIE_IMAGE(movie.poster_path)} fallbackSrc="https://via.placeholder.com/300x400" alt="naruto" objectFit="cover" />
          </AspectRatio>
          <Button w="100%" variant="solid" colorScheme="teal">Watch Trailer</Button>
        </Box>
        <Flex direction="column" justifyContent="center" gap="16px">
          <Heading as="h2" size="lg" >{movie.title}<span style={{fontWeight: 'normal'}}>({getYear(movie.release_date)})</span></Heading>
          <HStack>
            <Button isDisabled={isLoading} colorScheme="teal" rightIcon={<MdOutlineFavorite />} onClick={async () => onClickHandler(movieHelpers.addMovieToFavorite)}>{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</Button>
            <Button colorScheme="teal" rightIcon={<BsFillBookmarkFill />}>Add to Watchlist</Button>
          </HStack>
          <Text fontStyle="italic" color="teal">{movie.tagline}</Text>
          <Box as="section">
            <Heading mb="8px" as="h2" size="md">STORYLINE</Heading>
            <Text maxW="70%">{movie.overview}</Text>
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