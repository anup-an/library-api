import { Route, Routes } from "react-router-dom";
import LandingPage from "src/views/LandingPage";
import LoginPage from "src/views/LoginPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Routers;
