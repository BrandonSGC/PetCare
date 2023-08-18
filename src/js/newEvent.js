// Variables
const selectPet = document.querySelector('#pet');
const selectEvent = document.querySelector('#event');
const isloggedIn = JSON.parse(localStorage.getItem('loginState'));
const alert = document.querySelector('.alert');
const createEventButton = document.querySelector('#createEvent');

let petInfo = {};
let petsList = [];


// Events
document.addEventListener('DOMContentLoaded', () => {
    loadPets();
    loadEvents();

    selectPet.addEventListener('change', loadPetData);

    createEventButton.addEventListener('click', createEvent);
})

// Functions
function loadPets() {
    if (isloggedIn) {
        // Get User Info
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { id_usuario } = userInfo;

        // Send UserId as a URL parameter.
        fetch(`/getPets?id_usuario=${id_usuario}`)
        .then(data => data.json())
        .then(pets => {

            petsList = [...pets];
            pets.forEach(pet => {

                const { id_mascota, id_dueno, nombre, tipo, fecha_nacimiento } = pet;

                const option = document.createElement('option');
                option.value = id_mascota;
                option.textContent = nombre;

                selectPet.appendChild(option);
            });
        })
    } else {
        alert.classList.add('error');
        alert.classList.remove('success');
        alert.textContent = 'Debes de iniciar sesión primero...';
    }
    
}

function loadPetData() {
    const selectedPetId = parseInt(selectPet.value);

    // Get Selected Pet info.
    petInfo = petsList.find(pet => pet.id_mascota === selectedPetId);

    console.log(petInfo);
}

function loadEvents() {

    fetch(`/getEvents`)
    .then(data => data.json())
    .then(events => {

        events.forEach(event => {

            const { id_evento, descripcion } = event;

            const option = document.createElement('option');
            option.value = id_evento;
            option.textContent = descripcion;

            selectEvent.appendChild(option);
        });
    })
}

function createEvent(evt) {
    evt.preventDefault();
    // Validate form

    // Get Data
    const {id_mascota, id_dueno} = petInfo
    const event = parseInt(selectEvent.value);
    const date = document.querySelector('#date').value;
    const description = document.querySelector('#description').value;

    // Create object to send.
    const data = { id_mascota, event, date, description }

    fetch('./creaetEvent', {
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