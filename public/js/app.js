// Product data
const products = [
  { id: 1, name: 'Arm Chair', description: 'Comfortable arm chair', image: 'images/armchair.jpg', category: 'living-room' },
  { id: 2, name: 'Coffee Table', description: 'Stylish coffee table', image: 'images/coffee-table.jpg', category: 'living-room' },
  { id: 3, name: 'Desk', description: 'Modern desk', image: 'images/desk.jpg', category: 'bedroom' },
  { id: 4, name: 'Outdoor Patio Dining Set', description: 'Perfect for outdoor dining', image: 'images/patio-dining.jpg', category: 'outdoor' },
  { id: 5, name: 'Recliner', description: 'Comfortable recliner', image: 'images/recliner.jpg', category: 'living-room' },
  { id: 6, name: 'Sofa Chair', description: 'Elegant sofa chair', image: 'images/sofa-chair.jpg', category: 'living-room' },
  { id: 7, name: 'Sofa Chaise', description: 'Luxurious sofa chaise', image: 'images/sofa-chaise.jpg', category: 'living-room' },
  { id: 8, name: 'Sofa Lounge', description: 'Comfortable sofa lounge', image: 'images/sofa-lounge.jpg', category: 'living-room' },
  { id: 9, name: 'Sofa', description: 'Classic sofa', image: 'images/sofa.jpg', category: 'living-room' },
  { id: 10, name: 'Dining Table', description: 'Elegant dining table', image: 'images/dining-table.jpg', category: 'dining' },
  { id: 11, name: 'Cabinets', description: 'Spacious cabinets', image: 'images/cabinets.jpg', category: 'storage' },
];

// Cart count
let cartCount = 0;

// Initialize the application
function init() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      window.location.href = 'index.html';
      return;
  }

  renderProducts(products);
  setupEventListeners();
  lucide.createIcons();
}

// Render products to the DOM
function renderProducts(productsToRender) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  productsToRender.forEach(product => {
      const productCard = createProductCard(product);
      productList.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
      </div>
  `;
  return productCard;
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('product-list').addEventListener('click', handleAddToCart);
  document.getElementById('category-select').addEventListener('change', filterProducts);
}

// Handle add to cart functionality
function handleAddToCart(event) {
  if (event.target.matches('.add-to-cart-button')) {
      addToCart(event.target.dataset.productId);
  }
}

// Add product to the cart
function addToCart(productId) {
  const product = products.find(product => product.id === parseInt(productId));
  if (product) {
      cartCount++;
      document.getElementById('cart-count').textContent = cartCount;
      // Optionally, you can add logic to store cart items in local storage or a cart object
  }
}

// Filter products based on category
function filterProducts() {
  const selectedCategory = document.getElementById('category-select').value;
  const filteredProducts = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
  renderProducts(filteredProducts);
}

// Initialize the app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);