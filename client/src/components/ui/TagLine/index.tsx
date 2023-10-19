import { Box, Flex, Text } from "@chakra-ui/react";

const TagLine = () => {
  return (
    <Box>
      <Flex justifyContent="center" flexDirection="column">
        <Text
          bgGradient="linear(to-l, orange.200, orange.400)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
        >
          AP Library
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          Library for all seeking knowledge or joy
        </Text>
      </Flex>
    </Box>
  );
};

export default TagLine;
