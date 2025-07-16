import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Items/Items";
import "./Css/ShopCategory.css";

function ShopCategory({ banner, category }) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="shopcategory-container">
        <div className="shopcategory-products">
          {all_product.map((item, i) => {
            if (category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;
