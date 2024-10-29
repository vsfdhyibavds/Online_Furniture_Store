const products = [
    { id: 1, name: 'Arm Chair', description: 'Comfortable arm chair', image: 'https://source.unsplash.com/random/200x200/?armchair', category: 'living-room' },
    { id: 2, name: 'Coffee Table', description: 'Stylish coffee table', image: 'https://source.unsplash.com/random/200x200/?coffeetable', category: 'living-room' },
    { id: 3, name: 'Desk', description: 'Modern desk', image: 'https://source.unsplash.com/random/200x200/?desk', category: 'bedroom' },
    { id: 4, name: 'Outdoor Patio Dining Set', description: 'Perfect for outdoor dining', image: 'https://source.unsplash.com/random/200x200/?patiodining', category: 'outdoor' },
    { id: 5, name: 'Recliner', description: 'Comfortable recliner', image: 'https://source.unsplash.com/random/200x200/?recliner', category: 'living-room' },
    { id: 6, name: 'Sofa Chair', description: 'Elegant sofa chair', image: 'https://source.unsplash.com/random/200x200/?sofachair', category: 'living-room' },
    { id: 7, name: 'Sofa Chaise', description: 'Luxurious sofa chaise', image: 'https://source.unsplash.com/random/200x200/?sofachaise', category: 'living-room' },
    { id: 8, name: 'Sofa Lounge', description: 'Comfortable sofa lounge', image: 'https://source.unsplash.com/random/200x200/?sofalounge', category: 'living-room' },
    { id: 9, name: 'Sofa', description: 'Classic sofa', image: 'https://source.unsplash.com/random/200x200/?sofa', category: 'living-room' },
    { id: 10, name: 'Dining Table', description: 'Elegant dining table', image: 'https://source.unsplash.com/random/200x200/?diningtable', category: 'dining' },
    { id: 11, name: 'Cabinets', description: 'Spacious cabinets', image: 'https://source.unsplash.com/random/200x200/?cabinets', category: 'storage' },
  ];
  
  let cartCount = 0;
  
  function renderProducts(productsToRender) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    productsToRender.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <button onclick="addToCart()">Add to Cart</button>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }
  
  function addToCart() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
  }
  
  function filterProducts() {
    const selectedCategory = document.getElementById('category-select').value;
    const filteredProducts = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);
    renderProducts(filteredProducts);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    document.getElementById('category-select').addEventListener('change', filterProducts);
    lucide.createIcons();
  });