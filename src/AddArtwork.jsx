import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./api";

export default function AddArtwork() {
  const [form, setForm] = useState({
    title: "", artistName: "", description: "", price: "", imageUrl: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await authFetch("/artworks", {
        method: "POST",
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (res.status === 403) throw new Error("Only ADMIN can add artworks");
      if (!res.ok) throw new Error("Failed to add artwork");
      navigate("/artworks");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Add Artwork</h2>
        <form onSubmit={submit}>
          <input className="field" name="title" placeholder="Title" value={form.title} onChange={change} required />
          <input className="field" name="artistName" placeholder="Artist name" value={form.artistName} onChange={change} />
          <input className="field" name="description" placeholder="Description" value={form.description} onChange={change} />
          <input className="field" name="price" type="number" placeholder="Price" value={form.price} onChange={change} />
          <input className="field" name="imageUrl" placeholder="Image URL (https://...)" value={form.imageUrl} onChange={change} />
          <button className="btn btn-block" type="submit">Add</button>
        </form>
        <p className="error">{msg}</p>
      </div>
    </div>
  );
}