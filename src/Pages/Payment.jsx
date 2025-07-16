import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Css/Payment.css";
import { ShopContext } from "../Context/ShopContext";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(ShopContext);
  const [isPaid, setIsPaid] = useState(false);

  const totalAmount = location.state?.totalAmount || 0;

  const handlePayNow = () => {
    setIsPaid(true);
    dispatch({ type: "CLEAR_CART" }); 
  };

  return (
    <div className="payment-page">
      {!isPaid ? (
        <>
          <h1>Confirm Your Payment</h1>
          <p>
            Your total amount is:{" "}
            <strong>₹{totalAmount.toLocaleString()}</strong>
          </p>
          <button className="pay-now-btn" onClick={handlePayNow}>
            Pay Now
          </button>
        </>
      ) : (
        <>
          <h2>✅ Payment Successful</h2>
          <p>Thank you for shopping with us!</p>
          <button className="gohome" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;
