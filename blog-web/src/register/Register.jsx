import "../register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axiosInstance from "../../api";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        `auth/register`,
        data
      );

      alert(res.data.message);
      navigate("/"); // go to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="background">
      <form className="glass-box" onSubmit={handleSubmit}>
        <h1 className="title">REGISTER</h1>

        <div className="input-group">
          <input required type="text" name="username" onChange={handleChange} />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input required type="email" name="email" onChange={handleChange} />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input required type="password" name="password" onChange={handleChange} />
          <label>Password</label>
        </div>

        <button className="submit-btn" type="submit">CREATE ACCOUNT</button>

        <div className="links">
          <Link to="/">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
