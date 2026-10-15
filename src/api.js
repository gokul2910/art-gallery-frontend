const API = import.meta.env.VITE_API_URL || "http://localhost:8082/api";

export async function login(email, password) {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("email", data.email);
  return data;
}

export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function authFetch(path, options = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options.headers,
    },
  });
}

// full URL as-is; "/starrynight.jpg" is served from this site's public folder
export const imgSrc = (u) => {
  if (!u) return "";
  if (/^https?:\/\//.test(u)) return u;
  return u.startsWith("/") ? u : `/${u}`;
};