import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_BASE = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="background">
      <form className="glass-box" onSubmit={handleSubmit}>
        <h1 className="title">LOG IN</h1>
        <div className="input-group">
          <input required type="email" name="email" onChange={handleChange} />
          <label>Email</label>
        </div>
        <div className="input-group">
          <input required type="password" name="password" onChange={handleChange} />
          <label>Password</label>
        </div>
        <button className="submit-btn" type="submit">ENTER</button>
        <div className="links">
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
