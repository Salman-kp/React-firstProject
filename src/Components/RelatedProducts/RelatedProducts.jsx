import React, { useContext } from "react";
import "./RelatedProducts.css";
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import Item from "../Items/Items";

function RelatedProducts() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const currentProduct = all_product.find(
    (item) => String(item.id) === String(productId)
  );
  const relatedProducts = currentProduct
    ? all_product
        .filter(
          (item) =>
            item.category === currentProduct.category &&
            String(item.id) !== String(productId)
        )
        .slice(0, 4)
    : [];
  return (
    <div className="relatedproducts">
      <h1>Related Product</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No related products found.</p>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
