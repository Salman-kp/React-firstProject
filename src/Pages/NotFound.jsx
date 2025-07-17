import React from "react";
import "./Css/NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h2><span>404 </span><br />
      Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default NotFound;
