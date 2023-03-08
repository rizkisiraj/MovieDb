import { Flex,Box,Skeleton,SkeletonText, SkeletonCircle, HStack,Divider,Grid,AspectRatio } from '@chakra-ui/react'

const MovieSkeleton = () => (
    <Flex direction={{base: 'column' ,md: 'row' }} padding={{base: "8" ,md: "16"}} as="main" w="100%" paddingY="16px" gap="64px">
      <Box height="fit-content" position={{base:"static" ,md:"sticky"}} top="10px" minW="300px">
          <Skeleton>
          <AspectRatio w="100%" ratio={3 / 4} mb="16px">
            <Box borderRadius="20px" />
          </AspectRatio>
          </Skeleton>
          <Skeleton w="100%" h="40px" />
      </Box>
      <Box flexGrow="1">
          <Skeleton h="9" w="100%" mb="4" maxW="500px" />
          <HStack>
            <Skeleton h="7" w="100%" maxW="200px" />
            <Skeleton h="7" w="100%" maxW="200px" />
          </HStack>
          <SkeletonText mb="40px" w="100%" maxW="700px" mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          <SkeletonText mb="32px" w="100%" maxW="700px" mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
          <Box>
            <Skeleton mb="20px" h="4" w="100px" />
            <Divider />
            <Grid templateColumns={{base: "1fr" ,sm:"repeat(3,1fr)"}} padding="4" gap={{base: "2", md: "0"}} >
              <Flex alignItems="center" gap="2">
                <SkeletonCircle size="10" />
                <Skeleton w="80%" h="10" />
              </Flex>
              <Flex alignItems="center" gap="2">
                <SkeletonCircle size="10" />
                <Skeleton w="80%" h="10" />
              </Flex>
              <Flex alignItems="center" gap="2">
                <SkeletonCircle size="10" />
                <Skeleton w="80%" h="10" />
              </Flex>
            </Grid>
          </Box>
      </Box>
    </Flex>
)

export default MovieSkeleton