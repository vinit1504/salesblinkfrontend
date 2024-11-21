/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_Auth = ({ children }) => {
  // Hook to get the current location of the user in the app
  const location = useLocation();

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // If no token is found, the user is not authenticated, redirect to login page
  if (!token) {
    // Allow access to the login and register pages if the user is not authenticated
    if (["/auth/login", "/auth/register"].includes(location.pathname)) {
      return <>{children}</>;
    }
    // Redirect to login page if trying to access any other routes
    return <Navigate to="/auth/login" />;
  }

  // If token exists (authenticated), but user is trying to access login or register pages
  if (["/auth/login", "/auth/register"].includes(location.pathname)) {
    // Redirect to home page if authenticated user tries to access login or register
    return <Navigate to="/" />;
  }

  // If no redirection is needed, render the children (nested components or routes)
  return <>{children}</>;
};

export default Check_Auth;
