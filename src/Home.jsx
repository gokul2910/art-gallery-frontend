import { Link } from "react-router-dom";
import { isLoggedIn } from "./auth";

export default function Home() {
  const loggedIn = isLoggedIn();

  return (
    <div className="hero">
      <h1>Welcome to Our Art Gallery</h1>
      <p>Explore the beauty of art and creativity from world-renowned artists</p>
      <div className="hero-actions">
        <Link to="/artworks" className="btn-pink">Browse Collection</Link>
        {!loggedIn && <Link to="/login" className="btn-ghost">Login</Link>}
        {!loggedIn && <Link to="/register" className="btn-ghost">Register</Link>}
      </div>
    </div>
  );
}