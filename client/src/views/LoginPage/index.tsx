import { Box, Flex, Text } from "@chakra-ui/react";

import Login from "src/components/Login";
import TagLine from "src/components/ui/TagLine";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      h={["70vh", "70vh", "70vh", "100vh"]}
      alignItems="center"
      justifyContent="center"
      flexDirection={["column", "column", "row", "row"]}
    >
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        justifyContent="center"
        display={["none", "none", "none", "flex"]}
      >
        <TagLine />
      </Flex>
      <Box
        w={["100%", "100%", "100%", "50%"]}
        marginTop={["10vh", "10vh", "0vh"]}
        justifyContent="center"
      >
        <Flex justifyContent="center">
          <Box w={["100%", "100%", "450px", "450px"]}>
            <Login />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginPage;
