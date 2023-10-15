import { Box, Heading } from "@chakra-ui/react";

import Login from "src/components/Login";

const LoginPage = () => {
  return (
    <Box padding={4} width="50%">
      <Heading mb="10" fontSize="30px" marginTop="60px">Login</Heading>
      <Login />
    </Box>
  );
};

export default LoginPage;
