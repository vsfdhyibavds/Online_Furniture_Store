// Retrieve cart items from localStorage or initialize an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to create an item element for the cart
function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50" height="50">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    return itemElement;
}

// Function to render the cart
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // Clear the cart items container before rendering
    cartItemsContainer.innerHTML = '';

    // Calculate total and render cart items
    const total = cartItems.reduce((acc, item) => {
        cartItemsContainer.appendChild(createCartItemElement(item));
        return acc + item.price;
    }, 0);

    // Update total and count
    cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
    cartCountElement.textContent = cartItems.length;

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to remove an item from the cart
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    renderCart();
}

// Initialize the cart on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    lucide.createIcons(); // Ensure lucide is defined elsewhere
});