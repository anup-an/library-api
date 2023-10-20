import { Box, Flex } from "@chakra-ui/react";

import Login from "src/components/Login";
import TagLine from "src/components/ui/TagLine";

const LoginPage = () => {
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
        <Login />
      </Flex>
    </Box>
  );
};

export default LoginPage;
