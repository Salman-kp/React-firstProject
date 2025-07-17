import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import CartProduct from "../Components/CartProduct/CartProduct";
import { totalItems, totalPrice } from "../Context/CartReducer";
import { useNavigate } from "react-router-dom";
import "./Css/Cart.css";

function Cart() {
  const { cart } = useContext(ShopContext);
  const navigate = useNavigate();
  const amount = totalPrice(cart);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/payment", { state: { totalAmount: amount } });
  };

  return (
    <div className="cart-container">
      <div className={`cart-left ${cart.length === 0 ? "empty" : ""}`}>
        {cart.length > 0 ? (
          cart.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))
        ) : (
          <p className="cart-empty">Your cart is empty.</p>
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-right">
          <h3>Total Items: {totalItems(cart)}</h3>
          <h3>Total Pay: ₹{amount}</h3>
          <button className="checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
