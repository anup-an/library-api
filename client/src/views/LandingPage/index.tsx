import { Box, Text, Flex } from "@chakra-ui/layout";
import { Button} from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box>
      <Box
        w="100%"
        h="250px"
        bgGradient="linear(to-r, teal.100, teal.500)"
        boxShadow="2xl"
        borderTop="5px"
        borderColor="teal"
      />
      <Flex
        zIndex={40}
        display={["block", "block", "block", "flex"]}
        width="100%"
        alignItems="flex-end"
        gap="40px"
        marginTop="-80px"
        marginBottom="40px"
      >
        <Box w="350px" marginLeft="7vw" height="440px">
          <img src="/book_unsplash_image.jpeg" alt="Books" />
        </Box>
        <Flex
          p={["7vw", "7vw", "7vw", "0px"]}
          flexDirection={["row", "row", "row", "column"]}
        >
          <Box>
            <Text fontFamily="cursive" fontSize="xl">
              "There is no friend as loyal as a book." - Ernest Hemingway
            </Text>
            <Text
              bgGradient="linear(to-l, orange.200, orange.400)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
              marginRight="8vw"
            >
              Library for all seeking knowledge or joy
            </Text>
          </Box>
          <Box>
            <Button colorScheme="teal" variant="solid" marginTop="50px">
              Browse
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingPage;
