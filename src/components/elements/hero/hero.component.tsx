import { ArrowDownIcon} from "@chakra-ui/icons";
import { Center, Box, Heading, Text, Button, Highlight, Container } from "@chakra-ui/react";
import theme from "../../../theme";

export const Hero:React.FC = () => (
    <Center
    as="section"
    paddingTop={8}
    marginBottom="8"
    >
      <Container maxW="800px" textAlign="center">
        <Heading as="h2" size="2xl" textAlign="center" marginBottom="16px" colorScheme="blackAlpha">Find your favorite movies with <Highlight query="ease" styles={{color: "teal.300"}}>ease</Highlight></Heading>
        <Text fontSize="xl" marginBottom="16px" color="text">Experience the magic of cinema with our handpicked selection of exceptional movies. From drama to comedy, we have something for everyone. Find your next favorite film and join us on a journey of discovery today.</Text>
        <Button colorScheme="teal" size="lg" rightIcon={<ArrowDownIcon />}>Get Started</Button>
      </Container>
    </Center>
)