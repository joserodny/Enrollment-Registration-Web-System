import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckRole } from "./components/CheckRole";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/Enrollment" element={   <GuestRoute> <EnrollmentPage />  </GuestRoute>} />
      <Route path="/Login" element={   <GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/Dashboard" element={   <PrivateRoute><CheckRole/></PrivateRoute>} />
    </Routes>
  );
};
