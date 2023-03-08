import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import API_ENDPOINT from "../../../utils/api-endpoints/API_ENDPOINT";
import Cast from "../../../utils/interfaces/Cast";

const CrewCastCard = ({ person, type }: { person:Cast, type:'cast' | 'crew'  }) => {
  return (
    <HStack padding="16px" textAlign="center" height="100%" spacing="4">
      <Avatar size="xl" mb="8px" src={API_ENDPOINT.GET_MOVIE_IMAGE(person.profile_path)} />
      <Box>
        <Text fontWeight="bold">{person.name}</Text>
        <Text fontSize="sm">{type === 'cast' ? person.character : person.job}</Text>
      </Box>
   </HStack>
  )
} 

export default CrewCastCard;