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
        // Send UserId as a URL parameter.
        fetch(`/getPets?id_usuario=${id_usuario}`)
        .then(data => data.json())
        .then(pets => {
            const petQuantity = document.querySelector('#petQuantity');
            petQuantity.textContent = pets.length;

            console.log(`User has: ${pets.length} pets`);
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
    const petInfo = petsList.find(pet => pet.id_mascota === selectedPetId);

    console.log(petInfo);

    showPetData(petInfo);
}

function showPetData(pet) {
    const { id_mascota, nombre_dueno, id_dueno, nombre, tipo, fecha_nacimiento} = pet;
    
    const petName = document.querySelector('#name');
    const petOwner = document.querySelector('#owner');
    const petKind = document.querySelector('#kind');
    const petAge = document.querySelector('#age');

    petName.textContent = nombre;
    petOwner.textContent = nombre_dueno;
    petKind.textContent = tipo;
    petAge.textContent = fecha_nacimiento;
}