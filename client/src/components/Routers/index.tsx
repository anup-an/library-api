import { Route, Routes } from "react-router-dom";
import LandingPage from "src/views/LandingPage";
import LoginPage from "src/views/LoginPage";
import RegisterPage from "src/views/RegisterPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Routers;
