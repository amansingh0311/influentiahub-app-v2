// routes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth";
import SocialConnect from "../pages/Auth/SocialConnect";
import OnboardingDashboard from "../pages/OnboardingDashboard";
import Create from "../pages/Create";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/social-connect" element={<SocialConnect />} />
      <Route path="/dashboard" element={<OnboardingDashboard />} />
      <Route path="/create" element= {<Create /> }/>
      
      {/* Add more routes as needed */}
    </Routes>
  );
}
