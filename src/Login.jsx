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
    <div className="auth-wrap auth-login">
      <div className="auth-card glass">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <input className="field" placeholder="Enter Email" value={email}
                 onChange={(e) => setEmail(e.target.value)} />
          <input className="field" type="password" placeholder="Enter Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-block" type="submit">Login</button>
        </form>
        <p className="error">{msg}</p>
        <p className="alt">Don't have an account? <Link to="/register">Register Here</Link></p>
      </div>
    </div>
  );
}