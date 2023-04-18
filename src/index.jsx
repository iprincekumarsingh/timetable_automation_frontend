import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./layout/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomeAdmin from "./pages/admin/home";
import Teacher from "./pages/admin/teacher";

import Home from "./home";
import Profile from "./pages/dashboard/profile";
import CreateClass from "./pages/addClass";
import CreateSection from "./pages/addSection";
import CreateTimeSloot from "./pages/addTimeSlot";
import AssignTeacher from "./pages/AssignTeacher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "admin",
        element: <HomeAdmin></HomeAdmin>,
      },

      {
        path: "create-Account",
        element: <RegisterPage></RegisterPage>,
      },

      {
        path: "teacher",
        element: <Teacher></Teacher>,
      },

      {
        path: "timetable",
        element: <Home></Home>,
      },

      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "create-class",
        element: <CreateClass />,
      },
      {
        path: "create-section",
        element: <CreateSection />,
      },
      {
        path: "create-timeslot",
        element: <CreateTimeSloot />,
      },
      {
        path: "assign-teachers",
        element: <AssignTeacher />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
);
