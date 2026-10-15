import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { authFetch, imgSrc } from "./api";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    authFetch(`/artworks/${id}`)
      .then(async (res) => {
        const text = await res.text();
        setArt(res.ok && text ? JSON.parse(text) : null);
      })
      .catch(() => setArt(null))
      .finally(() => setLoading(false));
  }, [id]);

  const buy = async () => {
    setMsg("");
    setBuying(true);
    try {
      const res = await authFetch("/orders", {
        method: "POST",
        body: JSON.stringify({ artworkId: art.id }),
      });
      if (!res.ok) throw new Error("Could not place order");
      setOk(true);
      setMsg("Order placed successfully!");
    } catch (e) {
      setOk(false);
      setMsg(e.message);
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!art) return <div className="container"><p>Artwork not found.</p><Link to="/artworks">Back</Link></div>;

  return (
    <div className="container">
      <Link to="/artworks" className="back-link">← Back to gallery</Link>
      <div className="detail">
        <img src={imgSrc(art.imageUrl)} alt={art.title} />
        <div className="detail-info">
          <h2>{art.title}</h2>
          <p className="artist">by {art.artistName}</p>
          <p className="desc">{art.description}</p>
          {art.price != null && <p className="price big">₹{art.price}</p>}
          <button className="btn" onClick={buy} disabled={buying || ok}>
            {ok ? "Ordered ✓" : buying ? "Placing..." : "Buy Now"}
          </button>
          <p className={ok ? "success" : "error"}>{msg}</p>
        </div>
      </div>
    </div>
  );
}