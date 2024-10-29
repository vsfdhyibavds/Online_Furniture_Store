const user = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    memberSince: '2023-01-01'
  };
  
  const recentOrders = [
    { id: 1, date: '2023-05-01', total: 349.98, status: 'Delivered' },
    { id: 2, date: '2024-04-15', total: 199.99, status: 'Shipped' },
  ];
  
  function renderDashboard() {
    const userInfo = document.getElementById('user-info');
    const recentOrdersContainer = document.getElementById('recent-orders');
    const updateProfileForm = document.getElementById('update-profile-form');
    const changePasswordForm = document.getElementById('change-password-form');
  
    userInfo.innerHTML = `
      <h3>Welcome, ${user.name}!</h3>
      <p>Email: ${user.email}</p>
      <p>Member since: ${user.memberSince}</p>
    `;
  
    recentOrdersContainer.innerHTML = '<h3>Recent Orders</h3>';
    recentOrders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.className = 'order-item';
      orderElement.innerHTML = `
        <p>Order #${order.id} - ${order.date}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Status: ${order.status}</p>
      `;
      recentOrdersContainer.appendChild(orderElement);
    });
  
    // Populate update profile form
    updateProfileForm.name.value = user.name;
    updateProfileForm.email.value = user.email;
  
    // Add event listeners for forms
    updateProfileForm.addEventListener('submit', handleUpdateProfile);
    changePasswordForm.addEventListener('submit', handleChangePassword);
  }
  
  function handleUpdateProfile(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = Object.fromEntries(formData.entries());
    
    // In a real application, you would send this data to a server
    console.log('Profile update:', updatedUser);
    
    // Update the user object and re-render the dashboard
    user.name = updatedUser.name;
    user.email = updatedUser.email;
    renderDashboard();
    
    alert('Profile updated successfully!');
  }
  
  function handleChangePassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const passwordData = Object.fromEntries(formData.entries());
    
    // In a real application, you would send this data to a server and perform validation
    console.log('Password change:', passwordData);
    
    if (passwordData['new-password'] !== passwordData['confirm-password']) {
      alert('New password and confirmation do not match.');
      return;
    }
    
    // Reset the form
    event.target.reset();
    
    alert('Password changed successfully!');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    lucide.createIcons();
  });