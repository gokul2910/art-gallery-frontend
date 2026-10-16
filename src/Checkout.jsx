import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { authFetch, imgSrc } from "./api";

export default function Checkout() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch(`/artworks/${id}`)
      .then(async (res) => {
        const text = await res.text();
        setArt(res.ok && text ? JSON.parse(text) : null);
      })
      .catch(() => setArt(null))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const res = await authFetch("/orders", {
        method: "POST",
        body: JSON.stringify({ artworkId: art.id, ...form }),
      });
      if (!res.ok) {
        let m = "Could not place order";
        try {
          const data = await res.json();
          if (data.message) m = data.message;
        } catch {}
        throw new Error(m);
      }
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!art) return <div className="container"><p>Artwork not found.</p><Link to="/artworks">Back</Link></div>;

  if (done) {
    return (
      <div className="container">
        <div className="checkout-card" style={{ textAlign: "center" }}>
          <h2>Order placed successfully! 🎉</h2>
          <p>Thank you, {form.fullName}. "{art.title}" will be delivered to {form.city}.</p>
          <Link to="/artworks" className="back-link">← Back to gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to={`/artworks/${art.id}`} className="back-link">← Back</Link>
      <div className="checkout-card">
        <h2>Checkout</h2>

        <div className="checkout-summary">
          <img src={imgSrc(art.imageUrl)} alt={art.title} />
          <div>
            <h3>{art.title}</h3>
            <p>by {art.artistName}</p>
            <p className="price">₹{art.price}</p>
          </div>
        </div>

        <form onSubmit={placeOrder} className="checkout-form">
          <input name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} required />
          <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={onChange} required pattern="[0-9]{10}" />
          <textarea name="address" placeholder="Delivery address" value={form.address} onChange={onChange} required rows={3} />
          <input name="city" placeholder="City" value={form.city} onChange={onChange} required />
          <input name="pincode" placeholder="Pincode (6 digits)" value={form.pincode} onChange={onChange} required pattern="[0-9]{6}" />

          <p><b>Payment method</b></p>
          <label><input type="radio" name="paymentMethod" value="COD" checked={form.paymentMethod === "COD"} onChange={onChange} /> Cash on Delivery</label>
          <label><input type="radio" name="paymentMethod" value="UPI" checked={form.paymentMethod === "UPI"} onChange={onChange} /> UPI (demo)</label>
          <label><input type="radio" name="paymentMethod" value="CARD" checked={form.paymentMethod === "CARD"} onChange={onChange} /> Card (demo)</label>
          <small>Payment is simulated. No real payment details are collected.</small>

          <button className="btn" type="submit" disabled={placing}>
            {placing ? "Placing..." : "Place Order"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}