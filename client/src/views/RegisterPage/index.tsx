import { Box, Flex } from "@chakra-ui/react";
import Register from "src/components/Register";
import TagLine from "src/components/ui/TagLine";

const RegisterPage = () => {
  return (
    <Box
      display="flex"
      h="100vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        w="50%"
        display={["none", "none", "none", "flex"]}
        justifyContent="center"
      >
        <TagLine />
      </Flex>
      <Flex w={["100%", "100%", "100%", "50%"]} justifyContent="center">
        <Register />
      </Flex>
    </Box>
  );
};

export default RegisterPage;
