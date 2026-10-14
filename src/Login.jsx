import { useState } from "react";
import { login } from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await login(email, password);
      navigate("/artworks");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>🎨 Art Gallery</h2>
        <p className="sub">Sign in to explore the collection</p>
        <form onSubmit={handleSubmit}>
          <input className="field" placeholder="Email" value={email}
                 onChange={(e) => setEmail(e.target.value)} />
          <input className="field" type="password" placeholder="Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-block" type="submit">Login</button>
        </form>
        <p className="error">{msg}</p>
        <p className="alt">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}