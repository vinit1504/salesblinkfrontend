/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Component to handle authentication-based route redirection
const Check_Auth = ({ isAuthenticated, children }) => {
  // Hook to get the current location of the user in the app
  const location = useLocation();

  // If the user is not authenticated and tries to access a restricted route
  // Redirect them to the login page, except for the login or register routes
  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and tries to access login or register pages
  // Redirect them to the home page
  if (isAuthenticated && ["/auth/login", "/auth/register"].includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  // If no redirection is needed, render the children (nested components or routes)
  return <>{children}</>;
};

export default Check_Auth;
