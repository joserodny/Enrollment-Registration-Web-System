import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EnrollmentPage } from "./pages/EnrollmenPage";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Enrollment" element={<EnrollmentPage />} />
    </Routes>
  );
};
