// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import Cast from '../../../utils/interfaces/Cast';
import API_ENDPOINT from '../../../utils/api-endpoints/API_ENDPOINT';
import { Scrollbar } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

export const SwiperGallery = ({ cast }:{ cast:Cast[] }) => {
  return (
    <>
    <Heading size="lg" color="black" as="h2">Casts</Heading>
    <Swiper
      modules={[Scrollbar]}
      spaceBetween={50}
      slidesPerView={4}
      scrollbar={{draggable: true}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      style={{padding: "32px 0"}}
    >
     {
        cast.map(( c ) => (
          <>
            <SwiperSlide style={{"height": "auto"}} key={c.id}>
              <Box border="1px solid teal" padding="16px" textAlign="center" height="100%" minHeight={"200px"} shadow="lg">
                <Avatar size="xl" mb="8px" src={API_ENDPOINT.GET_MOVIE_IMAGE(c.profile_path)} />
                <Text fontWeight="bold" color="teal">{c.name}</Text>
                <Text color="teal">{c.character}</Text>
              </Box>
            </SwiperSlide>
            </>
        ))
     }
    </Swiper>
    </>
  );
};