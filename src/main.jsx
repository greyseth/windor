import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/assets/css/style.css";
import App from "./App.jsx";
import LoginProvider from "./providers/LoginProvider.jsx";
import LoginChecker from "./components/global/LoginChecker.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <LoginChecker />
      <App />
    </LoginProvider>
  </StrictMode>
);
