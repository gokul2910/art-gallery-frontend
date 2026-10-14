import { Link, useNavigate } from "react-router-dom";
import { logout, getRole } from "./auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="brand">🎨 Art Gallery</span>
      <div className="nav-links">
        <Link to="/artworks">Artworks</Link>
        {getRole() === "ADMIN" && <Link to="/admin">Add Artwork</Link>}
      </div>
      <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
    </nav>
  );
}