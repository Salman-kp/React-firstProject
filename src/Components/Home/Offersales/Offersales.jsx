import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../Items/Items";
import "./Offersales.css";

function Offersales() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/offer_sales")
      .then((res) => setItems(res.data))
      .catch((err) => {
        setError(err.message);
        console.error("Axios error:", err);
      });
  }, []);

  return (
    <div className="offersales">
      <h1>OFFER SALES</h1>
      <hr />
      {error && <div className="error">Error: {error}</div>}
      {items.length === 0 && !error && <div className="loading">Loading...</div>}

      <div className="offer-items">
        {items.map((item) => (
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
    </div>
  );
}

export default Offersales;
