document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // In a real application, you would send these credentials to a server for authentication
    console.log('Login attempt:', { email, password });
  
    // For demo purposes, we'll just simulate a successful login
    alert('Login successful! (This is a demo)');
    window.location.href = 'dashboard.html';
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
  });