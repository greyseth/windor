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
import Landing from "./pages/Landing.jsx";
import Profile from "./pages/Profile.jsx";
import Explore from "./pages/Explore.jsx";
import Store from "./pages/Store.jsx";
import CartProvider from "./providers/CartProvider.jsx";
import Checkout from "./pages/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "/app",
        element: <Home />,
      },
      {
        path: "/app/profile",
        element: <Profile />,
      },
      {
        path: "/app/stores",
        element: <Explore />,
        children: [
          {
            path: "/app/stores/:id_store",
            element: <Store />,
            children: [
              {
                path: "/app/stores/:id_store/checkout",
                element: <Checkout />,
              },
            ],
          },
        ],
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
        <CartProvider>
          <LoginChecker />
          <PopupHandler />

          <RouterProvider router={router} />
        </CartProvider>
      </PopupProvider>
    </LoginProvider>
  </StrictMode>
);
