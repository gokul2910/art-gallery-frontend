import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8082/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", mobile: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "60px auto" }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="username" placeholder="Username" value={form.username} onChange={change} required /><br /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={change} required /><br /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} required /><br /><br />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={change} /><br /><br />
        <button type="submit">Register</button>
      </form>
      <p style={{ color: "red" }}>{msg}</p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}