import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/assets/css/style.css";
import App from "./App.jsx";
import LoginProvider from "./providers/LoginProvider.jsx";
import LoginChecker from "./components/global/LoginChecker.jsx";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/404.jsx";
import Auth from "./pages/Login.jsx";
import PopupProvider from "./providers/PopupProvider.jsx";
import PopupHandler from "./components/global/PopupHandler.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <PopupProvider>
        <LoginChecker />
        <PopupHandler />

        <RouterProvider router={router} />
      </PopupProvider>
    </LoginProvider>
  </StrictMode>
);
