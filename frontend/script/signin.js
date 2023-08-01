
async function loginUser() {
    const email = document.getElementById('email_in').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const token = data.authorisation.token;
        localStorage.setItem("jwt_token", token);

        window.location.href = 'store.html';
      } else {
        displayErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      displayErrorMessage('An error occurred. Please try again later.');
    }
  }

  function displayErrorMessage(message) {
    const errorMessageElement = document.createElement('p');
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add('error-message');
  
    const containerSignin = document.querySelector('.container-signin');
    containerSignin.appendChild(errorMessageElement);
  
    document.getElementById('email_in').classList.add('error-input');
    document.getElementById('password').classList.add('error-input');
  }
  

  function clearErrorMessages() {
    const errorMessageElements = document.querySelectorAll('.error-message');
    errorMessageElements.forEach((element) => element.remove());
  
    document.getElementById('email_in').classList.remove('error-input');
    document.getElementById('password').classList.remove('error-input');
  }
  
 
  
  document.getElementById('login').addEventListener('click', loginUser);
 