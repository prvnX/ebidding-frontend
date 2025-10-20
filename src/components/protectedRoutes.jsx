import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../components/useAuthStore";
import api from "../pages/authApi";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { jwtToken, role, setAuthData, clearAuthData } = useAuthStore();
  const [loading, setLoading] = useState(true); 
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      // Already have a valid JWT
      if (jwtToken) {
        if (allowedRoles.includes(role)) {
          setAuthorized(true);
        }
        setLoading(false);
        return;
      }

      // No JWT — try refreshing
      try {
        const refreshResponse = await api.post("/refresh-token");
        if (refreshResponse.data && refreshResponse.data.jwtToken) {
          const { jwtToken, role, username } = refreshResponse.data;
          setAuthData({ jwtToken, role, username });
          if (allowedRoles.includes(role)) {
            setAuthorized(true);
          }
        } else {
          clearAuthData();
        }
      } catch (err) {
        console.error("Refresh token failed:", err);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [jwtToken, role, allowedRoles, setAuthData, clearAuthData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //Not authorized or refresh failed
  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  //Authorized
  return children;
};

export default ProtectedRoute;

