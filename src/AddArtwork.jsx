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
    <div style={{ maxWidth: 360, margin: "30px auto" }}>
      <h2>Add Artwork</h2>
      <form onSubmit={submit}>
        <input name="title" placeholder="Title" value={form.title} onChange={change} required /><br /><br />
        <input name="artistName" placeholder="Artist name" value={form.artistName} onChange={change} /><br /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={change} /><br /><br />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={change} /><br /><br />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={change} /><br /><br />
        <button type="submit">Add</button>
      </form>
      <p style={{ color: "red" }}>{msg}</p>
    </div>
  );
}