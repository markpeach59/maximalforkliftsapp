import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const currentUser = auth.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
