import _ from "lodash";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DispatchContext, StateContext } from "src/App";
import { authenticated, unauthenticated } from "src/types/authenticate";
import { logoutUser } from "src/api/user";
import { applyApiEffect } from "src/types/ApiTypes";
import { AUTHENTICATE } from "src/actions/authenticate";
import "./NavigationBar.scss";

const NavigationBar = () => {
  const { state } = useContext(StateContext);
  const { dispatch } = useContext(DispatchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isloggingOut, setIsLoggingOut] = useState<boolean>(false);

  const logOut = async () => {
    setIsLoggingOut(true);
    const response = await logoutUser();
    applyApiEffect(
      response,
      (data) => {
        dispatch({ type: AUTHENTICATE, payload: unauthenticated });
        localStorage.setItem("authStatus", JSON.stringify(unauthenticated));
        setIsLoggingOut(false);
      },
      (error) => {
        setIsLoggingOut(false);
      }
    );
  };

  const isSelected = (navItem: string) => {
    if (navItem === "/") {
      return location.pathname === navItem;
    }
    return location.pathname.includes(navItem);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box
        bg="orange"
        w="100%"
        p={4}
        height="60px"
        color="white"
        fontWeight="bold"
        fontSize={16}
        display="flex"
        flexFlow="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          padding="5px"
          className={`${isSelected("/") ? "nav-select" : ""}`}
          _hover={{
            color: "teal",
          }}
        >
          <NavLink to="/">Home</NavLink>
        </Box>
        <Box display="flex" flexFlow="row" alignItems="center">
          <Box
            padding="5px"
            className={`${isSelected("books") ? "nav-select" : ""}`}
            _hover={{
              color: "teal",
            }}
          >
            <NavLink to="/books">Books</NavLink>
          </Box>
          {state.authStatus !== authenticated ? (
            <>
              <Box
                padding="5px"
                marginLeft="30px"
                className={`${isSelected("login") ? "nav-select" : ""}`}
                _hover={{
                  color: "teal",
                }}
              >
                <NavLink to="/login">Login</NavLink>
              </Box>
              <Box
                padding="5px"
                marginLeft="30px"
                className={`${isSelected("register") ? "nav-select" : ""}`}
                _hover={{
                  color: "teal",
                }}
              >
                <NavLink to="/register">Signup</NavLink>
              </Box>
            </>
          ) : (
            <Box marginLeft="30px">
              <Menu autoSelect={false}>
                <MenuButton aria-label="Options">
                  <Avatar size="sm" />
                </MenuButton>
                <MenuList
                  bg="orange"
                  width={["250px", "300px"]}
                  paddingTop="0"
                  borderRadius="5px"
                >
                  <MenuItem
                    bg={`${isSelected("/user") ? "white" : "orange"}`}
                    color={`${isSelected("/user") ? "green" : "white"}`}
                    borderTopRadius="4px"
                    borderBottom="1px"
                    borderColor="gray.200"
                    onClick={() => handleNavigation("/user")}
                    fontWeight="bold"
                    _hover={{
                      bg: "gray.200",
                      color: "gray",
                    }}
                  >
                    Profile
                  </MenuItem>
                  <Flex h="100%" paddingTop="10px" justifyContent="center">
                    <Button
                      padding="10px"
                      height="30px"
                      colorScheme="teal"
                      variant="solid"
                      onClick={logOut}
                      isLoading={isloggingOut}
                      loadingText="Logging out"
                    >
                      Logout
                    </Button>
                  </Flex>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavigationBar;
