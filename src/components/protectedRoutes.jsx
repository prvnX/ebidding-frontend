import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../components/useAuthStore";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { jwtToken, role } = useAuthStore();

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
