document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  var product = document.getElementById('product').value;
  var quantity = document.getElementById('quantity').value;
  var address = document.getElementById('address').value;

  // Basic validation (you'll need more robust validation in a real application)
  if (product && quantity && address) {
      // Here you would typically send the order data to a server using AJAX
      console.log('Order placed:', product, quantity, address); 
      document.getElementById('order-message').textContent = 'Order placed successfully!';
  } else {
      document.getElementById('order-message').textContent = 'Please fill in all fields.';
  }
});