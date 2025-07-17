import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Items/Items";
import "./Css/Wishlist.css";

function Wishlist() {
  const { wishlist } = useContext(ShopContext);

  return (
    <div className="wishlist-page">
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">Your wishlist is empty</div>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
