import { Outlet } from "react-router-dom";
import NavigationBar from "src/components/NavigationBar";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
