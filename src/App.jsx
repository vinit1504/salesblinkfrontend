/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./index.css";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { Route, Routes, useLocation } from "react-router-dom"; 
import Check_Auth from "./components/Check-Auth";
import { useDispatch, useSelector } from "react-redux";
import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import { chechAuth } from "./store/auth";
import SubHeader from "./components/SubHeader";
import Sequences from "./pages/Sequences";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation(); 

  // useEffect(() => {
  //   dispatch(chechAuth());
  // }, [dispatch]);

  return (
    <div>
      {location.pathname !== "/auth/login" && location.pathname !== "/auth/register" && <Header />}
      <SubHeader />

      <Routes>
        <Route
          path="/auth/register"
          element={
            <Check_Auth isAuthenticated={isAuthenticated}>
              <RegisterPage />
            </Check_Auth>
          }
        />
        <Route
          path="/auth/login"
          element={
            <Check_Auth isAuthenticated={isAuthenticated}>
              <LoginPage />
            </Check_Auth>
          }
        />
        <Route
          path="/"
          element={
            <Check_Auth isAuthenticated={isAuthenticated}>
              <DashBoard />
            </Check_Auth>
          }
        />
        <Route
          path="/outreach"
          element={
            <Check_Auth isAuthenticated={isAuthenticated}>
              <Sequences />
            </Check_Auth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
