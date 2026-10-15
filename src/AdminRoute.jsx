import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "./auth";

export default function AdminRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/admin-login" replace />;
  return getRole() === "ADMIN" ? children : <Navigate to="/artworks" replace />;
}