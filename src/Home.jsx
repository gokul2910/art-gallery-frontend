import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">
      <h1>Welcome to Our Art Gallery</h1>
      <p>Explore the beauty of art and creativity from world-renowned artists</p>
      <Link to="/artworks" className="btn-pink">Browse Collection</Link>
    </div>
  );
}