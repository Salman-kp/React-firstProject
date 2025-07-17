import React, { useContext, memo } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { ShopContext } from "../../Context/ShopContext";
import "./Items.css";

const Item = memo(({ id, name, image, new_price, old_price }) => {
  const { toggleWishlist, wishlistItems } = useContext(ShopContext);
  const isInWishlist = wishlistItems?.includes(id);

  if (!id || !name || !image) return null;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, name, image, new_price, old_price });
  };

  return (
    <div className="item">
      <div className="wishlist-icon" onClick={handleWishlistClick}>
        <FaHeart color={isInWishlist ? "red" : "#444"} />
        
      </div>

      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={image} alt={name} />
        <p>{name}</p>
        <div className="item-prices">
          <span className="item-new-price">₹{new_price}</span>
          <span className="item-old-price">₹{old_price}</span>
        </div>
      </Link>
    </div>
  );
});

export default Item;
