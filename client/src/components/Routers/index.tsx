import { Route, Routes } from "react-router-dom";
import BookDetailsPage from "src/views/BookDetailsPage";
import BookListPage from "src/views/BookListPage";
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
      <Route path="/books" element={<BookListPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
    </Routes>
  );
};

export default Routers;
