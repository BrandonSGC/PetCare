// Variables
const selectPet = document.querySelector('#pet');
let petsList = [];

// Events
document.addEventListener('DOMContentLoaded', () => {
    loadPets();

    selectPet.addEventListener('change', loadPetData);
})


// Functions
function getInfoUser() {
    
}

function loadPets() {
    fetch('/getPets')
        .then(data => data.json())
        .then(pets => {
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