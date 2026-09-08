// src/components/RoleRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ allowedRole }) => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");

  // Not logged in
  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (userRole !== allowedRole) {
    if (userRole === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    if (userRole === "ORGANIZER") {
      return <Navigate to="/organizer" replace />;
    }

    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;