import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./Css/OrderSummary.css";

const OrderSummary = () => {
  const { orderProducts } = useContext(ShopContext);

  return (
    <div className="order-summary">
      <h2>My Orders</h2>

      {orderProducts.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orderProducts.map((p) => (
          <div className="order-item" key={p.id}>
            <img src={p.image} alt={p.name} />
            <div>
              <h4>{p.name}</h4>
              <p>Quantity : {p.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSummary;
