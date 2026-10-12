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
    try {
      await login(email, password);
      navigate("/artworks");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "60px auto" }}>
      <h2>Art Gallery Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{msg}</p>
      <p>New user? <Link to="/register">Register</Link></p>
    </div>
  );
}