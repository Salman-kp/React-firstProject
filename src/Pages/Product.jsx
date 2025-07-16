import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { addVisit } from "../Components/Home/Recent visited/Recentlyvisited"; // ✅ Update the path if needed

function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find((item) => item.id === String(productId));

  useEffect(() => {
    if (product) {
      addVisit(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading product...
      </div>
    );
  }

  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
