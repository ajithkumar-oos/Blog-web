import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered ✅ Now login");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Register</h3>
      <form className="card p-3" onSubmit={submit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={onChange} required />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={onChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={onChange} required />
        <button className="btn btn-warning w-100">Create Account</button>
      </form>
    </div>
  );
}
