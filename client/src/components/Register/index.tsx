import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, getErrorMessage } from "src/api/axios";
import { registerUser } from "src/api/user";
import { applyApiEffect, isSuccess } from "src/types/ApiTypes";

interface RegistrationDetails {
  username: string;
  password: string;
}

const MARGIN = 4;

const Register = () => {
  const history = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const response = await registerUser(registerDetails);
    applyApiEffect(
      response,
      (data) => {
        setLoading(false);
        history("/login");
      },
      (error: ApiError) => {
        setLoading(false);
        setErrorMessage(getErrorMessage(error));
      }
    );

    if (isSuccess(response)) {
      history("/login");
    }
  };

  const handleInputChnage = (
    name: keyof RegistrationDetails,
    value: RegistrationDetails[typeof name]
  ) => {
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  const redirectToLogin = () => {
    history("/register");
  };

  return (
    <Box w="450px" boxShadow="2xl" p="20px" border="white" borderRadius="10px">
      <form onSubmit={handleRegister}>
        {errorMessage && !loading ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Sign up failed! {errorMessage}</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <FormControl isRequired marginTop={MARGIN}>
          <FormLabel>E-mail</FormLabel>
          <Input
            name="username"
            value={registerDetails.username}
            onChange={(e) => handleInputChnage("username", e.target.value)}
            type="email"
            borderColor="black"
            placeholder="example@example.com"
          />
        </FormControl>
        <FormControl isRequired marginTop={MARGIN}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={registerDetails.password}
            onChange={(e) => handleInputChnage("password", e.target.value)}
            type="password"
            placeholder="Type your password here"
            borderColor="black"
          />
        </FormControl>
        <Button
          colorScheme="teal"
          variant="solid"
          type="submit"
          marginTop={MARGIN}
          isLoading={loading}
          loadingText="Signing up"
        >
          Sign Up
        </Button>
      </form>
      <Divider
        marginTop="20px"
        borderColor="teal"
        w="100%"
        marginBottom="10px"
      />
      <Text>Already have an account ?</Text>
      <Flex justifyContent="center">
        <Button colorScheme="teal" marginTop="10px" onClick={redirectToLogin}>
          Sign in to your account
        </Button>
      </Flex>
    </Box>
  );
};

export default Register;
