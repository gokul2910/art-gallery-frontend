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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Artworks</h2>
      {artworks.length === 0 && <p>No artworks yet.</p>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}>
        {artworks.map((a) => (
          <div key={a.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            {a.imageUrl && (
              <img src={imgSrc(a.imageUrl)} alt={a.title} style={{ width: "100%", borderRadius: 4 }} />
            )}
            <h3>{a.title}</h3>
            <p>{a.artistName}</p>
            {a.description && <p style={{ fontSize: 14 }}>{a.description}</p>}
            {a.price != null && <p>₹{a.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}