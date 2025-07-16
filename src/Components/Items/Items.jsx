import React, { useContext } from "react";
import "./Items.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { toggleWishlist, wishlistItems } = useContext(ShopContext);
  const isInWishlist = wishlistItems?.includes(props.id);

  if (!props.id || !props.name || !props.image) return null;

  return (
    <div className="item">
      <div
        className="wishlist-icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(props);
        }}
      >
        <FaHeart color={isInWishlist ? "red" : "black"} />
      </div>

      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)}
        src={props.image}alt={props.name}/>
      </Link>
      
      <p>{props.name}</p>
      <div className="item-prices">
        <span className="item-new-price">₹{props.new_price}</span>
        <span className="item-old-price">₹{props.old_price}</span>
      </div>
    </div>
  );
};

export default Item;
