import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NavigationBar = () => {
  return (
    <>
      <Box
        bg="orange"
        w="100%"
        p={4}
        color="white"
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
          <Box w="100px" h="100%">
            <NavLink to="/login">Login</NavLink>
          </Box>
          <Box w="100px" h="100%">
            <NavLink to="/register">Register</NavLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavigationBar;
