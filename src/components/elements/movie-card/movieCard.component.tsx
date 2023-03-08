import { GridItem, Image, Text, HStack, AspectRatio, Box, } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Movie from "../../../utils/interfaces/Movie";
import API_ENDPOINT from "../../../utils/api-endpoints/API_ENDPOINT";
import NextLink from "next/link";

export const MovieCard = ({ movie }: { movie:Movie }) => {
  const { original_title, poster_path, vote_average, id } = movie

  return (
    <GridItem w="100%" overflow="hidden" >
        <AspectRatio maxW="100%" ratio={3/4}>
          <Image fallbackSrc='https://via.placeholder.com/300x400' objectPosition="center" objectFit="cover" w="100%" src={API_ENDPOINT.GET_MOVIE_IMAGE(poster_path)} alt="movie title" borderRadius="10" marginBottom="2" />
        </AspectRatio>
        <Text w="fit-content" _hover={{textDecoration: 'underline'}} fontWeight="600" fontSize="lg" marginY="2"><NextLink style={{display: 'block'}} href={`/movies/${id}`}>{original_title}</NextLink></Text>
        <HStack spacing="3"><StarIcon color="teal.300" /> <Text>{vote_average}</Text></HStack>
    </GridItem>
  )
};