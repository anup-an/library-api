import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { DispatchContext, StateContext } from "src/App";
import { AUTHENTICATE } from "src/actions/authenticate";
import { loginUser } from "src/api/user";
import "src/components/Login/Login.scss";
import { isSuccess } from "src/types/ApiTypes";
import { authenticated } from "src/types/authenticate";

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
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await loginUser(credentials);
    if (isSuccess(response)) {
      dispatch({ type: AUTHENTICATE, payload: authenticated });
      localStorage.setItem("authStatus", JSON.stringify(authenticated));
      history("/");
    }
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
    <>
      <form onSubmit={handleLogin}>
        <FormControl isRequired marginTop={MARGIN}>
          <FormLabel>E-mail</FormLabel>
          <Input
            name="username"
            value={credentials.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            type="email"
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
          />
        </FormControl>
        <Button
          colorScheme="purple"
          variant="outline"
          type="submit"
          marginTop={MARGIN}
          isLoading={loading}
          loadingText="Signing in"
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
