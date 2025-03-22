import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  const user = auth.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
