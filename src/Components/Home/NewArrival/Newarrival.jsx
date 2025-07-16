import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../Items/Items";
import './Newarrivals.css';

function Newarrivals() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/new_arrival")
      .then((res) => setItems(res.data))
      .catch((err) => {
        setError(err.message);
        console.error("Axios error:", err);
      });
  }, []);

  return (
    <div className="newarrivals">
      <h1>New Arrivals</h1>
      <hr />
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div className="new-item">
        {items.length === 0 && !error && <div>Loading...</div>}
        {items.map((item, i) => (
          <Item
            key={i}
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

export default Newarrivals;
