const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalBtn = document.getElementById('openModalBtn')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('closeModal')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="header">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <button id="openModalBtn" onclick="openModal('${pokemon.number}')" class="modalBtn" type="button">i</button>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemontoModal(pokemon){
    return `
        <div class="modal-content ${pokemon.type}">
            <button type ="button" onclick="closeModal()" class="closeBtn">&times</button>
            <div class="modal-header">
                <span class="modal-name">${pokemon.name}</span>
                <span class="modal-number">#${pokemon.number}</span>
                <ol class="modal-types">
                    ${pokemon.types.map((type) => `<li class="modal-type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img src="${pokemon.photo}">
            <div class="general-info">
                <div class="attributes">
                    <h3>Attributes</h3>
                    <span class="pokemon-height">Height: ${pokemon.height}m</span>
                    <span class="pokemon-weight">Weight: ${pokemon.weight}kg</span>
                </div>
                <ul class="moves">
                    <h3>Moves</h3>
                    ${pokemon.moves.map((move) => `<li>${move}</li>`).join('')}

                </ul>
                <ul class="abilities">
                    <h3>Abilities</h3>
                    ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
                </ul>
            </div>

        </div>
    `
}

function openModal(id)  {
    pokeApi.getModal(id)
        .then((pokemon) => {
            const newModal = convertPokemontoModal(pokemon)
            modal.innerHTML = newModal;
            modal.style.display = 'block';
    })

}

function closeModal(){
    modal.style.display = "none";
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})