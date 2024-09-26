// DOM Elements
const registerSection = document.getElementById('registerSection');
const loginSection = document.getElementById('loginSection');
const adminLoginSection = document.getElementById('adminLoginSection');
const showLogin = document.getElementById('showLogin');
const showRegister = document.getElementById('showRegister');
const adminLoginButton = document.getElementById('adminLoginButton');
const showUserLogin = document.getElementById('showUserLogin');

// Toggle between register and login forms
showLogin.addEventListener('click', () => {
  registerSection.style.display = 'none';
  loginSection.style.display = 'block';
  adminLoginSection.style.display = 'none';
});

showRegister.addEventListener('click', () => {
  loginSection.style.display = 'none';
  registerSection.style.display = 'block';
  adminLoginSection.style.display = 'none';
});

// Show admin login form
adminLoginButton.addEventListener('click', () => {
  registerSection.style.display = 'none';
  loginSection.style.display = 'none';
  adminLoginSection.style.display = 'block';
});

// Show user login form from admin login form
showUserLogin.addEventListener('click', () => {
  adminLoginSection.style.display = 'none';
  loginSection.style.display = 'block';
});

// Registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const regUsername = document.getElementById('regUsername').value;
  const regPassword = document.getElementById('regPassword').value;
  const registerMessage = document.getElementById('registerMessage');

  // AJAX request to PHP for storing the user in the database
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "register.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        registerMessage.style.display = 'block';
        setTimeout(() => registerMessage.style.display = 'none', 3000); // Hide message after 3 seconds
      } else {
        alert(response.message);
      }
    }
  };

  xhr.send("username=" + encodeURIComponent(regUsername) + "&password=" + encodeURIComponent(regPassword));
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;
  const errorMessage = document.getElementById('errorMessage');

  // AJAX request to PHP for validating login credentials
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Redirect to the user view page
        window.location.href = 'userview.html';
      } else {
        errorMessage.style.display = 'block';
        errorMessage.innerText = response.message;
        setTimeout(() => errorMessage.style.display = 'none', 3000); // Hide message after 3 seconds
      }
    }
  };

  xhr.send("username=" + encodeURIComponent(loginUsername) + "&password=" + encodeURIComponent(loginPassword));
});

// Admin login form submission
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const adminUsername = document.getElementById('adminUsername').value;
  const adminPassword = document.getElementById('adminPassword').value;
  const adminErrorMessage = document.getElementById('adminErrorMessage');

  // Example check for admin credentials (replace with actual admin authentication)
  const isAdmin = adminUsername === 'admin' && adminPassword === 'admin';

  if (isAdmin) {
    // Redirect to the admin dashboard
    window.location.href = 'admin.html';
  } else {
    adminErrorMessage.style.display = 'block';
    setTimeout(() => adminErrorMessage.style.display = 'none', 3000); // Hide message after 3 seconds
  }
});