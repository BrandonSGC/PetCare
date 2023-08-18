// Do fetch with id_usuario and the data from the pet to /registerPet...
const isloggedIn = JSON.parse(localStorage.getItem('loginState'));

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const registerButton = document.querySelector('.pet__button');

    // Events
    registerButton.addEventListener('click', registerPet);

})


// Functions
function registerPet(evt) {
    evt.preventDefault();

    // Validar que haya iniciado sesion...
    if (isloggedIn) {
        // Get values from inputs
        const name = document.querySelector('#name').value;
        const kind = document.querySelector('#animal').value;
        const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
        const id_dueno = JSON.parse(localStorage.getItem('userInfo')).id_usuario;

        // Create object to send.
        const data = { name, kind, fechaNacimiento, id_dueno }

        fetch('./registerPet', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => showAlert(data))
    } else {
        const alert = document.querySelector('.alert');

        alert.classList.add('error');
        alert.classList.remove('success');
        alert.textContent = 'Debes de iniciar sesion antes de registrar una mascota.';
    }
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