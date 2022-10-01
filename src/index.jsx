import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./routes";
import ErrorPage from "./error-page";
import Users from "./components/Users";
import UserData from "./components/Userdata";
import Favorites from "./components/Favorites";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "users/:username",
        element: <UserData />,
      },
      {
        path: "Favorties",
        element: <Favorites />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
