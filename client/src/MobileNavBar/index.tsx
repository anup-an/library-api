import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DispatchContext, StateContext } from "src/App";
import { AUTHENTICATE } from "src/actions/authenticate";
import { logoutUser } from "src/api/user";
import { applyApiEffect } from "src/types/ApiTypes";
import { authenticated, unauthenticated } from "src/types/authenticate";

const navigationConfig = [
  { name: "Home", pathname: "/" },
  { name: "Books", pathname: "/books" },
  { name: "Login", pathname: "/login" },
  { name: "Signup", pathname: "/register" },
];
const MobileNavBar = () => {
  const { state } = useContext(StateContext);
  const { dispatch } = useContext(DispatchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isloggingOut, setIsLoggingOut] = useState<boolean>(false);

  const isSelected = (navItem: string) => {
    if (navItem === "/") {
      return location.pathname === navItem;
    }
    return location.pathname.includes(navItem);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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

  return (
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
      <Menu autoSelect={false}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList bg="orange" width={["250px", "300px"]}>
          {navigationConfig.map((config) => (
            <MenuItem
              bg={`${isSelected(config.pathname) ? "white" : "orange"}`}
              color={`${isSelected(config.pathname) ? "green" : "white"}`}
              onClick={() => handleNavigation(config.pathname)}
              fontWeight="bold"
              _hover={{
                bg: "gray.200",
                color: "gray",
              }}
            >
              {config.name}
            </MenuItem>
          ))}
          {state.authStatus === authenticated ? (
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
          ) : (
            ""
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MobileNavBar;
