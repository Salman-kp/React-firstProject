import React, { useContext } from 'react';
import './CartProduct.css';
import { ShopContext } from '../../Context/ShopContext';

function CartProduct({ product }) {
  const { cart, dispatch } = useContext(ShopContext);

  const Increase = (id) => {
    const index = cart.findIndex((p) => p.id === id);
    if (cart[index].quantity < 5) {
      dispatch({ type: 'Increase', id });
    }
  };

  const Decrease = (id) => {
    const index = cart.findIndex((p) => p.id === id);
    if (cart[index].quantity > 1) {
      dispatch({ type: 'Decrease', id });
    }
  };

  return (
    <div className="container">
      <img src={product.image} alt={product.name} />

      <div className="details">
        <h3>{product.name}</h3>
        <h4>₹{product.new_price}</h4>

        <div className="buttons-container">
           <button className="rounded-circle" onClick={() => Decrease(product.id)} aria-label="Decrease quantity">
            <b>-</b>
          </button>
          <button className="quantity-display" disabled>{product.quantity}</button>
          <button className="rounded-circle" onClick={() => Increase(product.id)} aria-label="Increase quantity">
            <b>+</b>
          </button>
        </div>

        <button className="remove button" onClick={()=>dispatch({type:"Remove",id:product.id})}>Remove</button>
      </div>
    </div>
  );
}

export default CartProduct;
