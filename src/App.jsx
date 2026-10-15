import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import Register from "./Register";
import AdminRoute from "./AdminRoute";
import AddArtwork from "./AddArtwork";
import ArtworksPage from "./ArtworksPage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";
import ArtworkDetail from "./ArtworkDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/artworks"
        element={
          <ProtectedRoute>
            <Navbar />
            <ArtworksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/artworks/:id"
        element={
          <ProtectedRoute>
            <Navbar />
            <ArtworkDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Navbar />
            <AddArtwork />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}