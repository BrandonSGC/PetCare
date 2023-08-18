document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const loginButton = document.querySelector('.login__button');

    // Events
    loginButton.addEventListener('click', login);

})


// Functions
function login(evt) {
    evt.preventDefault();

    // Get values from inputs
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Create object to send.
    const data = { email, password }

    fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => showAlert(data))
}


function showAlert(messageObject) {
    const {success, message} = messageObject;
    
    const alert = document.querySelector('.alert');

    // Success ? if there is class = 'success', else 'error'.
    console.log(success);
    // alert.classList.add(success ? 'success' : 'error');
    if (success) {
        alert.classList.add('success');
        alert.classList.remove('error');
        alert.textContent = message;
    } else {
        alert.classList.add('error');
        alert.classList.remove('success');
        alert.textContent = message;
    }
    // alert.textContent = message;
}