import { Box, Heading } from "@chakra-ui/react";

import Login from "src/components/Login";

const LoginPage = () => {
  return (
    <Box padding={4}>
      <Heading mb="10">Login</Heading>
      <Login />
    </Box>
  );
};

export default LoginPage;
