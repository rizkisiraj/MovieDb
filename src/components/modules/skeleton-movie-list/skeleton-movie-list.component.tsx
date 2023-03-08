import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

const SkeletonMovieList = () => (
    <Grid templateColumns={{base: "repeat(2, 1fr)",sm: "repeat(4, 1fr)" ,md:"repeat(6, 1fr)"}} autoRows={{base: "200px" ,md:"270px"}} gap="12" px="8">
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
          <GridItem>
            <Skeleton w="full" h="full" borderRadius="lg" />
          </GridItem>
    </Grid>
)

export default SkeletonMovieList;