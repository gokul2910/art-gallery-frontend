import { useState } from "react";
import { login } from "./api";
import { logout } from "./auth";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const data = await login(email, password);
      if (data.role !== "ADMIN") {
        logout();
        throw new Error("This account is not an admin");
      }
      navigate("/admin");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="auth-wrap auth-admin">
      <div className="auth-card glass">
        <Link to="/login" className="back-btn">Back</Link>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input className="field" placeholder="Admin Email" value={email}
                 onChange={(e) => setEmail(e.target.value)} />
          <input className="field" type="password" placeholder="Admin Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-block" type="submit">Login</button>
        </form>
        <p className="error">{msg}</p>
      </div>
    </div>
  );
}