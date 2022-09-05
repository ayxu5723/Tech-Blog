// Modified code from Module 14 mini project
const loginFormHandler = async (event) => {
  event.preventDefault();
  hideLoginAlert();
  // Collect values from the login form
  const email = $('#email-login').value.trim();
  const password = $('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      loginAlert();
    }
  }
};

// Sign up form 
const signupFormHandler = async (event) => {
  event.preventDefault();
  hideSignUpAlert();

  const name = $('#name-signup').value.trim();
  const email = $('#email-signup').value.trim();
  const password = $('#password-signup').value.trim();

  if(!name || !email || !password || password.length <8) {signUpAlert()}

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

  // This automatically logs the user in after a successful sign up
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// Code that hides login and displays sign up
const showSignup = () => {
  const signup = $('signupHidden');
  const login = $('loginHidden');

  login.style.display = 'none';
  signup.style.display = 'contents';

}
// Code that hides signup and displays login
const showLogin = () =>{
  const signup = $('signupHidden');
  const login = $('loginHidden');

  login.style.display = 'contents';
  signup.style.display = 'none';
}

$('.login-form').addEventListener('submit', loginFormHandler);

$('.signup-form').addEventListener('submit', signupFormHandler);


$('#signup-promptBtn').addEventListener('click', showSignup);

$('#signup-promptBtn2').addEventListener('click', showSignup);

$('#login-promptBtn').addEventListener('click', showLogin);

// Errors that display if user input criteria are not met
const signUpAlert = () => {
  const signUpAlert = $('#signUpAlert');
  signUpAlert.style.display = 'block';
}

const hideSignUpAlert = () => {
  const signUpAlert = $('#signUpAlert');
  signUpAlert.style.display = 'none';
}

const loginAlert = () => {
  const loginAlert = $('#loginAlert');
  loginAlert.style.display = 'block';
}

const hideLoginAlert = () => {
  const loginAlert = $('#loginAlert');
  loginAlert.style.display = 'none';
}

