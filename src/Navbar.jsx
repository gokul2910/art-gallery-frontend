import { Link, useNavigate } from "react-router-dom";
import { logout, getRole } from "./auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #ddd" }}>
      <strong>Art Gallery</strong>
      <div>
  <Link to="/artworks">Artworks</Link>
  {getRole() === "ADMIN" && <> | <Link to="/admin">Add Artwork</Link></>}
</div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}