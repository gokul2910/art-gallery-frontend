import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import AdminRoute from "./AdminRoute";
import AddArtwork from "./AddArtwork";
import ArtworksPage from "./ArtworksPage";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
        path="/admin"
        element={
          <AdminRoute>
            <Navbar />
            <AddArtwork />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/artworks" replace />} />
    </Routes>
  );
}