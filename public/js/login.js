document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Send these credentials to a server for authentication
    console.log('Login attempt:', { email, password });
  
    // Successful login
    alert('Login successful!');
    window.location.href = 'index.html';
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
  });