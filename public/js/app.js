import { Navigation } from './components/Navigation.js';
import { CategoryFilter } from './components/CategoryFilter.js';
import { ProductList } from './components/ProductList.js';

class App {
  constructor() {
    this.navigation = new Navigation();
    this.categoryFilter = new CategoryFilter();
    this.productList = new ProductList();
    this.init();
  }

  async init() {
    await this.renderApp();
    this.setupEventListeners();
    this.initializeLucide();
    this.setupIntersectionObserver();
  }

  async renderApp() {
    // Render components asynchronously
    const [navHTML, filterHTML, productsHTML] = await Promise.all([
      this.navigation.render(),
      this.categoryFilter.render(),
      this.productList.render()
    ]);

    document.querySelector('header').innerHTML = navHTML;
    document.querySelector('main').innerHTML = `
      ${filterHTML}
      ${productsHTML}
    `;
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, options);

    // Observe all product images
    document.querySelectorAll('.product-item img').forEach(img => {
      if (img.dataset.src) {
        observer.observe(img);
      }
    });
  }

  setupEventListeners() {
    // Use event delegation for better performance
    document.addEventListener('change', (e) => {
      if (e.target.id === 'category-select') {
        this.filterProducts(e.target.value);
      }
    });

    document.addEventListener('onclick', (e) => {
      if (e.target.matches('.product-item button')) {
        this.addToCart(e.target.dataset.productId);
      }
    });
  }

  filterProducts(category) {
    requestAnimationFrame(() => {
      const products = document.querySelectorAll('.product-item');
      products.forEach(product => {
        const display = category === 'all' || product.dataset.category === category ? 'block' : 'none';
        product.style.display = display;
      });
    });
  }

  addToCart(productId) {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
  }

  initializeLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
// Cart functionality
// Initialize cart count
let cartCount = 0;

// Function to handle adding items to the cart
function addToCart(event) {
    const button = event.target;
    const productName = button.getAttribute('data-name');
    const productPrice = button.getAttribute('data-price');

    // Here you can add code to store the product in the cart (e.g., in local storage or an array)
    console.log(`Added to cart: ${productName} - $${productPrice}`);

    // Update the cart count
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
}

// Attach event listeners to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('button[data-name]');
addToCartButtons.forEach(button => {
    button.addEventListener('onclick', addToCart);
});
// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-item button').forEach(button => {
  button.addEventListener('onclick', function(e) {
    const productItem = e.target.closest('.product-item');
    const product = {
      name: productItem.querySelector('h3').textContent,
      price: parseFloat(productItem.querySelector('p').textContent.replace('$', '')),
      image: productItem.querySelector('img').src,
      quantity: 1
    };

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show feedback to user
    showNotification('Item added to cart!');
  });
});

// Update cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Category filter functionality
document.getElementById('category-select').addEventListener('change', function(e) {
  const category = e.target.value;
  const products = document.querySelectorAll('.product-item');
  
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});