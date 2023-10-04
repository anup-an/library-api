import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { StateContext } from "src/App";
import { authenticated } from "src/types/authenticate";

const NavigationBar = () => {
  const { state } = useContext(StateContext);
  return (
    <>
      <Box
        bg="orange"
        w="100%"
        p={4}
        color="white"
        fontWeight="bold"
        display="flex"
        flexFlow="row"
        justifyContent="space-between"
      >
        <Box w="100px" h="100%">
          <NavLink to="/">Home</NavLink>
        </Box>
        <Box display="flex" flexFlow="row">
          <Box w="100px" h="100%">
            <NavLink to="/books">Browse</NavLink>
          </Box>
          {state.authStatus !== authenticated ? (
            <>
              <Box w="100px" h="100%">
                <NavLink to="/login">Login</NavLink>
              </Box>
              <Box w="100px" h="100%">
                <NavLink to="/register">Register</NavLink>
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavigationBar;
