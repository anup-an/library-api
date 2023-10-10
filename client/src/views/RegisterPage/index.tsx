import { Box, Heading } from "@chakra-ui/react";
import Register from "src/components/Register";

const RegisterPage = () => {
  return (
    <Box padding={4}>
      <Heading mb="10">Register</Heading>
      <Register />
    </Box>
  );
};

export default RegisterPage;
