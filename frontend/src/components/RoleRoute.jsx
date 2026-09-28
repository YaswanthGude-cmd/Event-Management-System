import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ allowedRoles }) => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");

  // User is not logged in
  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Check whether the user's role is allowed
  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }

  // Redirect based on user's actual role
  if (userRole === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (userRole === "ORGANIZER") {
    return <Navigate to="/organizer" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RoleRoute;