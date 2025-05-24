import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import { LoginPage } from "./pages/LoginPage";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Enrollment" element={<EnrollmentPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
