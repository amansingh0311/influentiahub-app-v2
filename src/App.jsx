import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth";
import "./App.css";
import SocialConnect from "./pages/Auth/SocialConnect";
import OnboardingDashboard from "./pages/OnboardingDashboard";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/social-connect" element={<SocialConnect />} />
          <Route path="/create" element={<OnboardingDashboard />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}
