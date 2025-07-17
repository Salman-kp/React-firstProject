import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import OrderSummary from "./Pages/OrderSummary";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { ShopContext } from "./Context/ShopContext";
import laptop_banner from "/images/banner_laptop.png";
import phone_banner from "/images/banner_phone.png";
import "./App.css"; 

function App() {
  const { currentUser } = useContext(ShopContext);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laptop" element={<ShopCategory banner={laptop_banner} category="laptop" />} />
            <Route path="/phone" element={<ShopCategory banner={phone_banner} category="phone" />} />
            <Route path="/product/:productId" element={<Product />} />

            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/order" element={<ProtectedRoute><OrderSummary /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
