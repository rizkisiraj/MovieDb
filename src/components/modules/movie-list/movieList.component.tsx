import { Box, Flex, Heading, Link as ChakraLink, Grid, GridItem, Image, Text, HStack, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../../../utils/interfaces/Movie";
import { MovieCard } from "../../elements/movie-card/movieCard.component";

export const MovieList = ({ sectionTitle, movies, type }: { sectionTitle:string, movies:Movie[], type:'full' | 'short' }) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 640px)')
  
  return (
    <Box
      as="section"
      width="100%"
      marginBottom="16"
      paddingX={{base: 8, md: 16}}
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
      {
        isSmallScreen && type === 'short' ? 
        <Swiper
      spaceBetween={10}
      slidesPerView={2.3}
      >
        {
          movies.map(movie => (
            <SwiperSlide>
              <MovieCard key={`${movie.id}`} movie={movie} />
            </SwiperSlide>
          ))
        }
      </Swiper> : 
      <Grid
      templateColumns={{base:"repeat(2, 1fr)", sm:"repeat(2,1fr)", md:"repeat(3,1fr)", lg:"repeat(4,1fr)", xl:"repeat(6,1fr)"}}
      gap={{base: "8" ,sm:"12"}}
      >
      {
        movies.map(movie => (
          <MovieCard movie={movie} key={`${movie.id}`} />
        ))
      }
      </Grid>
      }
    </Box>
  );
}