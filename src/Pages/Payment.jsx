import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./Css/Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, dispatch, saveOrderToDB } = useContext(ShopContext);
  const [isPaid, setIsPaid] = useState(false);
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    if (sessionStorage.getItem("paymentDone") === "true") {
      setIsPaid(true);
    }
  }, []);

  const handlePayNow = () => {
    if (cart.length === 0) return;
    setIsPaid(true);
    sessionStorage.setItem("paymentDone", "true");
    setTimeout(() => {
      saveOrderToDB(cart);
      dispatch({ type: "CLEAR_CART" });
    }, 200);
  };

  const goHome = () => {
    sessionStorage.removeItem("paymentDone");
    navigate("/");
  };

  return (
    <div className="payment-page">
      {isPaid ? (
        <>
          <h2>Payment Successful</h2>
          <p>Thank you for shopping with us!</p>
          <button type="button" className="gohome"
           onClick={goHome}>Go to Home</button>
        </>
      ) : cart.length > 0 ? (
        <>
          <h1>Confirm Your Payment</h1>
          <p>Your total amount is: <strong>
          ₹{totalAmount.toLocaleString()}</strong></p>
          <button type="button" className="pay-now-btn" 
          onClick={handlePayNow}>Pay Now</button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Payment;
