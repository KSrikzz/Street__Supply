// client/js/product.js
// Requires api.js

async function addProduct(name, quantity, price) {
  const res = await fetch(`${API_BASE}/products/add`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, quantity, price })
  });
  return await res.json();
}

async function getMyProducts() {
  const res = await fetch(`${API_BASE}/products/my-products`, {
    method: "GET",
    headers: authHeaders()
  });
  return await res.json();
}
