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
    setMsg("");
    try {
      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 409) throw new Error("Email already registered");
      if (!res.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Create account</h2>
        <p className="sub">Join the gallery in a few seconds</p>
        <form onSubmit={submit}>
          <input className="field" name="username" placeholder="Username" value={form.username} onChange={change} required />
          <input className="field" name="email" placeholder="Email" value={form.email} onChange={change} required />
          <input className="field" name="password" type="password" placeholder="Password" value={form.password} onChange={change} required />
          <input className="field" name="mobile" placeholder="Mobile" value={form.mobile} onChange={change} />
          <button className="btn btn-block" type="submit">Register</button>
        </form>
        <p className="error">{msg}</p>
        <p className="alt">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}