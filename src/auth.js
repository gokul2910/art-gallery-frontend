export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");

export function isLoggedIn() {
  try {
    const payload = JSON.parse(atob(getToken().split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
}