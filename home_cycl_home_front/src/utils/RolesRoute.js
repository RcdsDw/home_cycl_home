import React from "react";
import { Navigate } from "react-router-dom";

export default function RolesRoute({ allowedRoles, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/auth/login" />;

  if (!allowedRoles.includes(user.roles?.[0]))
    return <Navigate to="/unauthorized" />;

  return children;
}
