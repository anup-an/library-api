import { Box, Heading } from "@chakra-ui/react";
import Register from "src/components/Register";

const RegisterPage = () => {
  return (
    <Box padding={4} width="50%">
      <Heading mb="10" marginTop="60px" fontSize="30px">
        Sign Up
      </Heading>
      <Register />
    </Box>
  );
};

export default RegisterPage;
