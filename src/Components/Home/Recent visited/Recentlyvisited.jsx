import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Recentlyvisited.css";
import { ShopContext } from "../../../Context/ShopContext";

const KEY = "recentlyVisited";
const MAX = 10;

export const addVisit = (product) => {
  if (!product?.id) return;

  const newItem = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.new_price,
  };

  const existing = JSON.parse(localStorage.getItem(KEY) || "[]").filter(
    (p) => p.id !== newItem.id
  );

  const updated = [newItem, ...existing].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

const getVisits = () => JSON.parse(localStorage.getItem(KEY) || "[]");

const RecentlyVisited = () => {
  const [visits, setVisits] = useState([]);
  const { toggleWishlist, wishlistItems } = useContext(ShopContext);

  useEffect(() => {
    const update = () => setVisits(getVisits());
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  if (!visits.length) return null;

  return (
    <section className="recently">
      <h2>Recently Visited</h2>
      <hr />
      <div className="recently-grid">
        {visits.map((item) => {
          const isInWishlist = wishlistItems?.includes(item.id);
          return (
            <div className="item" key={item.id}>
              <div
                className="wishlist-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
              >
                <FaHeart color={isInWishlist ? "red" : "black"} />
              </div>

              <Link to={`/product/${item.id}`}>
                <img
                  onClick={() => window.scrollTo(0, 0)}
                  src={item.image}
                  alt={item.name}
                />
              </Link>

              <p>{item.name}</p>
              <p style={{fontSize: "1.1rem",color: "#2e8b57",fontWeight: "bold"}}>
                ₹{item.price}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentlyVisited;
