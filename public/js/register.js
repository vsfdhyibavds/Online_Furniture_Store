document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Basic validation
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Simulate saving user data (this should be done on the server-side in a real application)
  const userData = {
    username: username,
    email: email,
    password: password
  };

  // Save user data to local storage (for demonstration purposes)
  localStorage.setItem('user', JSON.stringify(userData));

  // Redirect to the login page
  alert("Registration successful! You can now log in.");
  window.location.href = 'login.html';
});