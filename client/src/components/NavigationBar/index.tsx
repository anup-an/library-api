import { NavLink } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DispatchContext, StateContext } from "src/App";
import { authenticated, unauthenticated } from "src/types/authenticate";
import { logoutUser } from "src/api/user";
import { applyApiEffect } from "src/types/ApiTypes";
import { AUTHENTICATE } from "src/actions/authenticate";

const NavigationBar = () => {
  const { state } = useContext(StateContext);
  const { dispatch } = useContext(DispatchContext);
  const [isloggingOut, setIsLoggingOut]  = useState<boolean>(false)
  const logOut = async () => {
    setIsLoggingOut(true)
    const response = await logoutUser()
    applyApiEffect(
      response,
      (data) => { 
        dispatch({ type: AUTHENTICATE, payload: unauthenticated });
        localStorage.setItem("authStatus", JSON.stringify(unauthenticated));
        setIsLoggingOut(false)
      },
      (error) => {
        setIsLoggingOut(false)
      }
    )
  }
  return (
    <>
      <Box
        bg="orange"
        w="100%"
        p={4}
        height="60px"
        color="white"
        fontWeight="bold"
        display="flex"
        flexFlow="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box w="100px" h="100%">
          <NavLink to="/">Home</NavLink>
        </Box>
        <Box display="flex" flexFlow="row" alignItems="center">
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
          {state.authStatus === authenticated ? (
            <>
              <Box w="100px" h="100%">
                <Button
                  colorScheme="purple"
                  variant="outline"
                  onClick={logOut}
                  isLoading={isloggingOut}
                  loadingText="Logging out"
                >
                  Logout
                </Button>
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
