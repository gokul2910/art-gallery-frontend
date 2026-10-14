import { useEffect, useState } from "react";
import { authFetch } from "./api";

const API = import.meta.env.VITE_API_URL || "http://localhost:8082/api";
const ORIGIN = API.replace(/\/api\/?$/, "");

const imgSrc = (u) => {
  if (!u) return "";
  if (/^https?:\/\//.test(u)) return u;
  return `${ORIGIN}${u.startsWith("/") ? "" : "/"}${u}`;
};

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch("/artworks")
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Not authorized. Please log in again.");
        }
        if (!res.ok) throw new Error("Failed to load artworks");
        return res.json();
      })
      .then(setArtworks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container"><p>Loading artworks...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <h2 className="page-title">Artworks</h2>
      {artworks.length === 0 && <p>No artworks yet.</p>}
      <div className="grid">
        {artworks.map((a) => (
          <div key={a.id} className="art-card">
            {a.imageUrl && <img src={imgSrc(a.imageUrl)} alt={a.title} />}
            <div className="art-body">
              <h3>{a.title}</h3>
              <p className="artist">{a.artistName}</p>
              {a.description && <p className="desc">{a.description}</p>}
              {a.price != null && <p className="price">₹{a.price}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}