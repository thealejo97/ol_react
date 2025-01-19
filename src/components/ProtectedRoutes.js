import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      {/* Agrega más rutas protegidas aquí */}
    </Routes>
  );
};

export default ProtectedRoutes;
