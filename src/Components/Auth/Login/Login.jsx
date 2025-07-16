import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ShopContext } from "../../../Context/ShopContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setCurrentUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!form.email) err.email = "Email is required";
    else if (!/^[\w.%+-]+@gmail\.com$/i.test(form.email))
      err.email = "Enter valid Gmail only";
    if (!form.password) err.password = "Password is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.get(`http://localhost:3001/users?email=${form.email}&password=${form.password}`);
      if (res.data.length) {
        const user = res.data[0];
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        navigate("/");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } catch {
      setErrors({ general: "Server error" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="email"
          placeholder="Gmail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <p className="err">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={errors.password ? "error-input" : ""}
        />
        {errors.password && <p className="err">{errors.password}</p>}
        {errors.general && <p className="err">{errors.general}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="auth-toggle" onClick={() => navigate("/signup")}>
          Signup here
        </span>
      </p>
    </div>
  );
};

export default Login;
