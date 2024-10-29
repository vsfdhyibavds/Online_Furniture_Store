let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCheckoutSummary() {
  const checkoutSummary = document.getElementById('checkout-summary');
  let total = 0;

  const summaryHTML = cartItems.map(item => {
    total += item.price;
    return `<div class="checkout-item">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    </div>`;
  }).join('');

  checkoutSummary.innerHTML = `
    <h3>Order Summary</h3>
    ${summaryHTML}
    <div class="checkout-total">
      <strong>Total:</strong>
      <strong>$${total.toFixed(2)}</strong>
    </div>
  `;
}

document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const orderData = Object.fromEntries(formData.entries());

  // In a real application, you would send this data to a server for processing
  console.log('Order placed:', orderData);

  // Clear the cart and redirect to a confirmation page
  localStorage.removeItem('cartItems');
  alert('Order placed successfully! Thank you for your purchase.');
  window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  lucide.createIcons();
});