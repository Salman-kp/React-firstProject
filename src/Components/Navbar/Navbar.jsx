import React, { useContext } from "react";
import logo from "/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    wishlist,
    cart,
    dispatch,
    setWishlist,
    orderProducts,
    setOrderProducts,
  } = useContext(ShopContext);

  const handleLogout = () => {
    dispatch({ type: "CLEAR_CART" });
    setWishlist([]);
    setOrderProducts([]);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("recentlyVisited");
    setCurrentUser(null);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="site logo" />
        <p>E-com</p>
      </div>

      <ul className="nav-menu">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/laptop">Laptop</NavLink>
        </li>
        <li>
          <NavLink to="/phone">Phone</NavLink>
        </li>
      </ul>

      <div className="nav-icons">
        <div className="nav-icons-wishlist">
          <NavLink to="/wishlist">
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="icon-badge">{wishlist.length}</span>
            )}
          </NavLink>
        </div>

        <div className="nav-icons-cart">
          <NavLink to="/order">
            <FaBagShopping />
            {orderProducts.length > 0 && (
              <span className="icon-badge">{orderProducts.length}</span>
            )}
          </NavLink>
        </div>

        <div className="nav-icons-cart">
          <NavLink to="/cart">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="icon-badge">{cart.length}</span>
            )}
          </NavLink>
        </div>

        <div className="nav-login-btn">
          {currentUser ? (
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="login-btn">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
