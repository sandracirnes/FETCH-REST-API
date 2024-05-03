
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';



const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
})

// obtener el anterior
//
//
// obtener el siguiente

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
    })



////////////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))

async function getPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del Pokémon');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}





// Función para mostrar la tarjeta del Pokémon en el DOM
function displayPokemonCard(pokemon) {
    const cardContainer = document.querySelector('.card--container');

    // Crear elementos para la tarjeta del Pokémon
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('h3');
    name.textContent = pokemon.name;

    const id = document.createElement('p');
    id.textContent = `ID: ${pokemon.id}`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight}`;

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    // Agregar elementos a la tarjeta del Pokémon
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(weight);
    card.appendChild(image);

    // Agregar la tarjeta a la página
    cardContainer.appendChild(card);
}

// Event listener para el botón de obtener Pokémon
document.getElementById('get-btn').addEventListener('click', async () => {
    const pokemonName = document.getElementById('poke-name').value.toLowerCase();
    const pokemonData = await getPokemonData(pokemonName);
    displayPokemonCard(pokemonData);
});

// Event listener para cargar los Pokémon al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Obtener los Pokémon guardados en localStorage y mostrarlos
    const savedPokemon = JSON.parse(localStorage.getItem('pokemon'));
    if (savedPokemon) {
        savedPokemon.forEach(pokemon => displayPokemonCard(pokemon));
    }
});

// Event listener para guardar los Pokémon en localStorage antes de cerrar la ventana
window.addEventListener('beforeunload', () => {
    const pokemonCards = document.querySelectorAll('.card');
    const pokemonData = [];
    pokemonCards.forEach(card => {
        const pokemon = {
            name: card.querySelector('h3').textContent,
            id: parseInt(card.querySelector('p').textContent.split(': ')[1]),
            weight: parseInt(card.querySelectorAll('p')[1].textContent.split(': ')[1]),
            sprites: {
                front_default: card.querySelector('img').src
            }
        };
        pokemonData.push(pokemon);
    });
    localStorage.setItem('pokemon', JSON.stringify(pokemonData));
});
