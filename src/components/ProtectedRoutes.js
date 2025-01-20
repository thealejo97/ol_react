import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MerchantFormPage from "../pages/MerchantFormPage";
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
      
      <Route 
        path="/merchant-form" 
        element={
          <ProtectedRoute>
            <MerchantFormPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/merchant-form/:id" 
        element={
          <ProtectedRoute>
            <MerchantFormPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default ProtectedRoutes;
