import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";

import { DispatchContext, StateContext } from "src/App";
import { AUTHENTICATE } from "src/actions/authenticate";
import { loginUser } from "src/api/user";
import "src/components/Login/Login.scss";
import { applyApiEffect } from "src/types/ApiTypes";
import { authenticated } from "src/types/authenticate";
import { ApiError, getErrorMessage } from "src/api/axios";

interface LoginCredentials {
  username: string;
  password: string;
}

const MARGIN = 4;

const Login = () => {
  const history = useNavigate();
  const { dispatch } = useContext(DispatchContext);
  const { state } = useContext(StateContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    const response = await loginUser(credentials);
    applyApiEffect(
      response,
      (data) => {
        dispatch({ type: AUTHENTICATE, payload: authenticated });
        setLoading(false);
      },
      (error: ApiError) => {
        setLoading(false);
        setErrorMessage(getErrorMessage(error));
      }
    );
  };

  const redirectToSignUp = () => {
    history("/register");
  };

  const handleInputChange = (
    name: keyof LoginCredentials,
    value: LoginCredentials[typeof name]
  ) => {
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    if (state.authStatus === authenticated) {
      history("/");
    }
  });

  if (state.authStatus === authenticated) {
    return (
      <Box>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontSize="md">Redirecting to homepage</Text>
      </Box>
    );
  }

  return (
    <Box boxShadow="2xl" p="20px" border="white" borderRadius="10px">
      <Text
        bgGradient="linear(to-l, orange.200, orange.400)"
        bgClip="text"
        fontSize="2xl"
        fontWeight="extrabold"
        textAlign="center"
      >
        Log In
      </Text>
      <form onSubmit={handleLogin}>
        {errorMessage && !loading ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription display="flex">
              Login failed! {errorMessage}
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <FormControl isRequired marginTop={MARGIN}>
          <FormLabel>E-mail</FormLabel>
          <Input
            name="username"
            value={credentials.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            type="email"
            borderColor="black"
            placeholder="example@example.com"
          />
        </FormControl>
        <FormControl isRequired marginTop={MARGIN}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={credentials.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
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
          loadingText="Signing in"
        >
          Login
        </Button>
      </form>
      <Divider
        marginTop="20px"
        borderColor="teal"
        w="100%"
        marginBottom="10px"
      />
      <Text>Do not have an account yet ?</Text>
      <Flex justifyContent="center">
        <Button colorScheme="teal" marginTop="10px" onClick={redirectToSignUp}>
          Create an account
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
