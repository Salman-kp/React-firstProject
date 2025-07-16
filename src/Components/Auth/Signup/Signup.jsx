import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { ShopContext } from "../../../Context/ShopContext";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { currentUser, setCurrentUser } = useContext(ShopContext);
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const validate = () => {
    const err = {};
    if (form.username.trim().length < 3) err.username = "Min 3 characters";
    if (!/^[\w.%+-]+@gmail\.com$/i.test(form.email)) err.email = "Enter Gmail only";
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(form.password))
      err.password = "6+ characters & a number";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   // ✅ Prevents page reload
    e.stopPropagation();  // ✅ Prevents bubbling

    if (!validate()) return;

    try {
      const { data } = await axios.get(`http://localhost:3001/users?email=${form.email}`);
      if (data.length) {
        setErrors({ email: "User already exists" });
        return;
      }

      const users = await axios.get("http://localhost:3001/users");
      const newUser = { ...form, id: String(users.data.length + 1) };

      await axios.post("http://localhost:3001/users", newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setCurrentUser(newUser); // 🔁 Will trigger redirect via useEffect
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className={errors.username ? "error-input" : ""}
        />
        {errors.username && <p className="err">{errors.username}</p>}

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

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{" "}
        <span className="auth-toggle" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Signup;
