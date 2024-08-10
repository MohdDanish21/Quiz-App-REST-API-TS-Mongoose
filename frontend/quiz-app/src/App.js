import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { useState } from "react";
import "./App.css";
import Landing from "./Pages/Landing";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";

function App() {
  const [token, setToken] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/register",
      element: <Register setToken={setToken} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <Otp token={token} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
