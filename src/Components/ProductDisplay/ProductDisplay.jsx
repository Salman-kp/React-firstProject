import React, { useContext } from "react";
import './ProductDisplay.css';
import star_icon from "/images/star_icon.png";
import star_dull_icon from "/images/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function ProductDisplay({ product }) {

  const { cart,dispatch}=useContext(ShopContext)
  const navigate=useNavigate()
   const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: "Add", product: product });
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Stay ahead with our latest smartphones and powerful laptops
          all in one place. From smooth performance to
          premium sound, get the gadgets that match your lifestyle.
        </div>
        
        {isInCart ? (
          <button onClick={handleGoToCart}>GO TO CART</button>
        ) : (
          <button onClick={handleAddToCart}>ADD TO CART</button>
        )}
          
          <p className="productdisplay-right-category">
                <span>Category : </span> {product.category}
            </p>
            <p className="productdisplay-right-category">
                <span>Tags : </span>Modern, Latest
            </p>
      </div>
    </div>
  );
}

export default ProductDisplay;
