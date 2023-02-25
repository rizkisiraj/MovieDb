import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link as ChakraLink, Grid, GridItem, Image, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
import Movie from "../../../utils/interfaces/Movie";
import { MovieCard } from "../../elements/movie-card/movieCard.component";

export const MovieList = ({ sectionTitle, movies, type }: { sectionTitle:string, movies:Movie[], type:'full' | 'short' }) => {
  return (
    <Box
      as="section"
      width="100%"
      marginBottom="16"
      paddingX="16"
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom="8">
        <Heading
        as="h2"
        size="md"
        >
        { sectionTitle }
        </Heading>
        {
          type === 'short' && <ChakraLink as={Link} href="/movies" color="GrayText">View all</ChakraLink>
        }
      </Flex>
      <Grid
      templateColumns={{base:"1fr", sm:"repeat(2,1fr)", md:"repeat(3,1fr)", lg:"repeat(4,1fr)", xl:"repeat(6,1fr)"}}
      gap="12"
      >
      {
        movies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))
      }
      </Grid>
    </Box>
  );
}