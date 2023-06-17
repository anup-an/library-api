import { Route, Routes } from "react-router-dom";
import LandingPage from "src/views/LandingPage";
import LoginPage from "src/views/LoginPage";
import RegisterPage from "src/views/RegisterPage";
import UserPage from "src/views/UserPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default Routers;
