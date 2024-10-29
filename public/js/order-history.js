const orders = [
    { id: 1, date: '2023-05-01', total: 349.98, status: 'Delivered' },
    { id: 2, date: '2023-04-15', total: 199.99, status: 'Shipped' },
    { id: 3, date: '2023-03-30', total: 499.97, status: 'Processing' },
  ];
  
  function renderOrderHistory() {
    const orderList = document.getElementById('order-list');
    
    orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.className = 'order-item';
      orderElement.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Date: ${order.date}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Status: ${order.status}</p>
      `;
      orderList.appendChild(orderElement);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderOrderHistory();
    lucide.createIcons();
  });