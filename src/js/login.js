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
    const {success, message, userInfo} = messageObject;

    const alert = document.querySelector('.alert');

    if (success) {
        alert.classList.add('success');
        alert.classList.remove('error');
        alert.textContent = message;

        const loginState = true;
        localStorage.setItem('loginState', JSON.stringify(loginState));

        // Get Info User
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(userInfo);
        // const { id_usuario, nombre, apellidos, email, contrasena } = userInfo;
        // console.log(id_usuario, nombre, apellidos, email, contrasena);

    } else {
        alert.classList.add('error');
        alert.classList.remove('success');
        alert.textContent = message;

        const loginState = false;
        localStorage.setItem('loginState', JSON.stringify(loginState));

        localStorage.removeItem('userInfo');
    }
}