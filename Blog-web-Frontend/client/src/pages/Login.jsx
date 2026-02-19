import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      alert("Login ✅");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Login</h3>
      <form className="card p-3" onSubmit={submit}>
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={onChange} required />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={onChange} required />
        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}
