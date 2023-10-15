import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "src/api/axios";
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

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    const response = await registerUser(registerDetails);
    applyApiEffect(
      response,
      (data) => {
        setLoading(false);
        history("/login");
      },
      (error: ApiError) => {
        setLoading(false);
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
  return (
    <div>
      <form onSubmit={handleRegister}>
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
    </div>
  );
};

export default Register;
