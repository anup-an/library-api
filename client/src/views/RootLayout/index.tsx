import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MobileNavBar from "src/MobileNavBar";
import NavigationBar from "src/components/NavigationBar";

const RootLayout = () => {
  return (
    <Box backgroundColor="gray.100">
      <Box
        position="fixed"
        width="100%"
        zIndex={20}
        display={["none", "none", "none", "block"]}
      >
        <NavigationBar />
      </Box>
      <Box
        position="fixed"
        width="100%"
        zIndex={20}
        display={["block", "block", "block", "none"]}
      >
        <MobileNavBar />
      </Box>
      <Box
        position="fixed"
        w="100vw"
        h="100vh"
        backgroundColor="gray.100"
        zIndex="-1"
      />
      <Outlet />
    </Box>
  );
};

export default RootLayout;
