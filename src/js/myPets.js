// Variables
const selectPet = document.querySelector('#pet');
const isloggedIn = JSON.parse(localStorage.getItem('loginState'));
const alert = document.querySelector('.alert');

let petsList = [];

// Events
document.addEventListener('DOMContentLoaded', () => {
    loadPets();

    selectPet.addEventListener('change', loadPetData);
})


// Functions
function loadPets() {
    if (isloggedIn) {
        // Get User Info
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { id_usuario } = userInfo;

        showUserName(userInfo);

        // Send UserId as a URL parameter.
        fetch(`/getPets?id_usuario=${id_usuario}`)
        .then(data => data.json())
        .then(pets => {
            const petQuantity = document.querySelector('#petQuantity');
            petQuantity.textContent = pets.length;

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
        alert.classList.add('warning');
        alert.classList.remove('success');
        alert.textContent = 'Por favor inicia sesión para cargar tus mascotas!';
    }
    
}

function loadPetData() {
    const selectedPetId = parseInt(selectPet.value);

    // Get Selected Pet info.
    const petInfo = petsList.find(pet => pet.id_mascota === selectedPetId);

    // Get All Events
    getEventsByPet(petInfo.id_mascota);

    showPetData(petInfo);
}

function showPetData(pet) {
    const { id_mascota, nombre_dueno, id_dueno, nombre, tipo, fecha_nacimiento} = pet;
    
    const petName = document.querySelector('#name');
    const petKind = document.querySelector('#kind');
    const petAge = document.querySelector('#age');

    petName.textContent = nombre;
    petKind.textContent = tipo;
    petAge.textContent = fecha_nacimiento;
}

function showUserName(userInfo) {
    const {nombre} = userInfo
    const owner = document.querySelector('#owner');
    owner.textContent = nombre;
}

function getEventsByPet(id_mascota) {
    // limpiarHTML();

    // Send id_mascota as a URL parameter.
    fetch(`/getPetEvents?id_mascota=${id_mascota}`)
    .then(data => data.json())
    .then(events => {
        events.forEach(event => {
            const { id_evento, nombre, fecha, descripcion, id_tipo_evento, descripcion_evento } = event;


            if (id_tipo_evento === 1) {
                const vaccineContainer = document.querySelector('#vaccines');

                const card = document.createElement('div');
                card.className = 'card';
                card.id = id_evento;
                card.innerHTML = `
                    <p class="event__date">Fecha: <span>${fecha}</span></p>
                            
                    <p class="event__description">Descripcion:</p>
                    <p>${descripcion}</p>

                    <button class="button event__button">Eliminar</button>
                `;
                vaccineContainer.appendChild(card);

            } else if (id_tipo_evento === 2) {
                const dewormingContainer = document.querySelector('#deworming');

                const card = document.createElement('div');
                card.className = 'card';
                card.id = id_evento;
                card.innerHTML = `
                    <p class="event__date">Fecha: <span>${fecha}</span></p>
                            
                    <p class="event__description">Descripcion:</p>
                    <p>${descripcion}</p>

                    <button class="button event__button">Eliminar</button>
                `;
                dewormingContainer.appendChild(card);
            } else {
                const appointmentsContainer = document.querySelector('#appointments');

                const card = document.createElement('div');
                card.className = 'card';
                card.id = id_evento;
                card.innerHTML = `
                    <p class="event__date">Fecha: <span>${fecha}</span></p>
                            
                    <p class="event__description">Descripcion:</p>
                    <p>${descripcion}</p>

                    <button class="button event__button">Eliminar</button>
                `;
                appointmentsContainer.appendChild(card);
            }
        });
    })
}

function limpiarHTML() {
    const appointmentsContainer = document.querySelector('#appointments');

    while (vaccineContainer.firstChild) {;
        appointmentsContainer.removeChild(appointmentsContainer.firstChild);
    }
}