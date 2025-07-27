// client/js/auth.js

// Handle Login
async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
}

// Handle Registration
async function registerUser(name, email, password, role) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });
  return await res.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === "seller") {
      window.location.href = "./seller/sellerDashboard.html";
    } else if (role === "vendor") {
      window.location.href = "./vendor/vendorDashboard.html";
    }
  }
});
