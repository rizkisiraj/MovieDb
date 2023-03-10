import { Hero } from '../components/elements/hero/hero.component';
import { MovieList } from '../components/modules/movie-list/movieList.component';
import { MovieCard } from '../components/elements/movie-card/movieCard.component';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Api_helpers from '../utils/api-endpoints/api_helpers';
import Movie from '../utils/interfaces/Movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import Head from 'next/head';

export const getStaticProps: GetStaticProps<{ popularMovies:Movie[],upcomingMovies:Movie[] }> = async () => {
  try {
    let [popularMoviesResponse, upcomingMoviesResponse]= await Promise.all([
      Api_helpers.getPopularMovies(),
      Api_helpers.getUpcomingMovies(),
    ]);

    const popularMovies:Movie[] = popularMoviesResponse.results.slice(0,6);
    const upcomingMovies:Movie[] = upcomingMoviesResponse.results.slice(0,6);
    
    return {
      props: {
        popularMovies,
        upcomingMovies  
      }
    }
  }
  catch(err) {
    console.log(err);
  };
  
}

const Index = ({ popularMovies, upcomingMovies }: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <>
    <Head>
      <title>Movie App</title>
    </Head>
      <Hero />
      <MovieList link='/popular-movies' type='short' sectionTitle='Popular Movies' movies={popularMovies} />
      <MovieList link='/upcoming-movies' type='short' sectionTitle='Upcoming Movies' movies={upcomingMovies} />
    </>
  )
}

export default Index
