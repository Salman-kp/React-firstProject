import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import laptop_banner from "/images/banner_laptop.png";
import phone_banner from "/images/banner_phone.png";
import Payment from "./Pages/Payment";
import OrderSummary from "./Pages/OrderSummary";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laptop"element={<ShopCategory banner={laptop_banner} category="laptop" />}/>
          <Route path="/phone"element={<ShopCategory banner={phone_banner} category="phone" />}/>
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
