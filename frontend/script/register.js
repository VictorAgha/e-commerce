 
 document.addEventListener('DOMContentLoaded', () => {

  function clearErrorMessages() {
    const errorMessageElements = document.querySelectorAll('.error-message');
    errorMessageElements.forEach((element) => element.remove());
  
    document.getElementById('email_in').classList.remove('error-input');
    document.getElementById('password').classList.remove('error-input');
  }
  
  async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roleUser = document.getElementById('role-user').checked;
    const roleAdmin = document.getElementById('role-admin').checked;
  
  
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, roleUser, roleAdmin }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        window.location.href = 'store.html';
      } else {
        displayErrorMessage('Registration failed. Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      displayErrorMessage('An error occurred. Please try again later.');
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register').addEventListener('click', registerUser);
  });

});