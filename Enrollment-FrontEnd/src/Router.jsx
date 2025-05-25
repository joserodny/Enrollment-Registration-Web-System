import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckRole } from "./components/CheckRole";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";
import { ConfirmEmailPage } from "./pages/ConfirmEmailPage";
import { RequestPassword } from "./components/RequestPassword";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Request-Password" element={<RequestPassword />} />
      <Route path="/Enrollment" element={ <EnrollmentPage /> } />
      <Route path="/Login" element={   <GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/Dashboard" element={   <PrivateRoute><CheckRole/></PrivateRoute>} />
      <Route path="/Confirm/:token" element={<ConfirmEmailPage />} /> 
      <Route path="/ResetPassword/:token" element={<ConfirmEmailPage />} /> 
    </Routes>
  );
};
