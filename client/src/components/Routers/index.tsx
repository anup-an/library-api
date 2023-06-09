import { Route, Routes } from "react-router-dom";
import LandingPage from "src/views/LandingPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Routers;
