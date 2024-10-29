// dashboard.js

// User data
const user = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    memberSince: '2023-01-01'
  };
  
  // Recent orders data
  const recentOrders = [
    { id: 1, date: '2023-05-01', total: 349.98, status: 'Delivered' },
    { id: 2, date: '2023-04-15', total: 199.99, status: 'Shipped' },
  ];
  
  // Function to render the dashboard
  function renderDashboard() {
    const userInfo = document.getElementById('user-info');
    const recentOrdersContainer = document.getElementById('recent-orders');
    const accountSettings = document.getElementById('account-settings');
  
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
  
    accountSettings.innerHTML = `
      <h3>Account Settings</h3>
      <form id="account-settings-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" required><br><br>
        <button type="submit" id="save-settings-btn">Save Changes</button>
      </form>
      <button onclick="changePassword()">Change Password</button>
      <button onclick="updateProfile()">Update Profile</button>
    `;
  }
  
  // Function to change password (not implemented)
  function changePassword() {
    alert('Change password functionality not implemented in this demo.');
  }
  
  // Function to update profile (not implemented)
  function updateProfile() {
    alert('Update profile functionality not implemented in this demo.');
  }
  
  // Add event listener to the form submission
  document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    lucide.createIcons();
  
    const accountSettingsForm = document.getElementById('account-settings-form');
  
    accountSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get the form data
      const formData = new FormData(accountSettingsForm);
  
      // Get the username, email, password, and confirm password values
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirm-password');
  
      // Validate the form data
      if (password === confirmPassword) {
        // Update the user's information (this will depend on your backend API)
        updateUserInformation(username, email, password)
          .then((response) => {
            console.log(response);
            // Update the user info div with the new information
            const userInfoDiv = document.getElementById('user-info');
            userInfoDiv.innerHTML = `Username: ${username}<br>Email: ${email}`;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert('Passwords do not match');
      }
    });
  });
  
  // Function to update the user's information (this will depend on your backend API)
  function updateUserInformation(username, email, password) {
    // This is a placeholder function, you'll need to implement the actual API call
    return new Promise((resolve, reject) => {
      // Simulate a successful API call
      resolve({ message: 'User information updated successfully' });
    });
  }