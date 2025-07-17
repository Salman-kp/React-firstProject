import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(ShopContext);
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;