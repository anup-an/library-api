import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import NavigationBar from "src/components/NavigationBar";

const RootLayout = () => {
  return (
    <>
      <Box position="fixed" width="100%" zIndex={20}>
        <NavigationBar />
      </Box>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
