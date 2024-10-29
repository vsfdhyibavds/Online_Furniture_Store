let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const cartCountElement = document.getElementById('cart-count');
  
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50" height="50">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price;
  });

  cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
  cartCountElement.textContent = cartItems.length;

  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  lucide.createIcons();
});