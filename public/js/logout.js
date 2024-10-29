function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('cartItems');
  // Redirect to the login page with a query parameter
  window.location.href = 'login.html?message=logged_out';
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
      });
  }
});