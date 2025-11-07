const products = [
  { id: 1, name: "Áo thun trắng", price: 250000, img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
  { id: 2, name: "Váy hoa mùa hè", price: 390000, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
  { id: 3, name: "Áo sơ mi nam", price: 310000, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3d3b" },
  { id: 4, name: "Quần jean nữ", price: 420000, img: "https://images.unsplash.com/photo-1576566588028-4147f3840b03" },
];

let cart = [];

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price.toLocaleString()} VNĐ</p>
      <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
}

function updateCart() {
  const items = document.getElementById('cart-items');
  const totalElem = document.getElementById('total');
  const cartCount = document.getElementById('cart-count');

  items.innerHTML = cart.map(item => `
    <li>${item.name} x${item.qty} - ${(item.price * item.qty).toLocaleString()} VNĐ 
      <button onclick="removeFromCart(${item.id})">❌</button>
    </li>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalElem.textContent = total.toLocaleString();
  cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  updateCart();
});

renderProducts();
