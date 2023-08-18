document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const registerButton = document.querySelector('.signIn__button');

    // Events
    registerButton.addEventListener('click', registerUser);

})


// Functions
function registerUser(evt) {
    evt.preventDefault();

    // Get values from inputs
    const name = document.querySelector('#name').value;
    const surnames = document.querySelector('#surnames').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Create object to send.
    const data = { name, surnames, email, password }

    fetch('./registerUser', {
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

    if (success) {
        alert.classList.add('success');
        alert.classList.remove('error');
        alert.textContent = message;
    } else {
        alert.classList.add('error');
        alert.classList.remove('success');
        alert.textContent = message;
    }
}