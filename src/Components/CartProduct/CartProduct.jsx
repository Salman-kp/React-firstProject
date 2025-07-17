import React, { useContext } from "react";
import "./CartProduct.css";
import { ShopContext } from "../../Context/ShopContext";

function CartProduct({ product }) {
  const { cart, dispatch } = useContext(ShopContext);
  const item = cart.find((p) => p.id === product.id);

  const increase = () => item.quantity < 5 && dispatch({ type: "Increase", id: product.id });
  const decrease = () => item.quantity > 1 && dispatch({ type: "Decrease", id: product.id });
  const remove = () => dispatch({ type: "Remove", id: product.id });

  return (
    <div className="cart-product">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <h4>₹{product.new_price}</h4>
        <div className="quantity-controls">
          <button className="rounded-circle" onClick={decrease}><b>-</b></button>
          <button className="quantity-display" disabled>{product.quantity}</button>
          <button className="rounded-circle" onClick={increase}><b>+</b></button>
        </div>
        <button className="remove-button" onClick={remove}>Remove</button>
      </div>
    </div>
  );
}

export default CartProduct;
