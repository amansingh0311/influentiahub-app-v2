import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./routes";
import "../src/App.css";
import "../src/assets/css/common.css";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AppRoutes />
      </Router>
    </SnackbarProvider>
  );
}
