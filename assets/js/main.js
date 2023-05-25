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
            <button id="openModalBtn" onclick="openModal('${pokemon.number}')" type="button">Abrir modal</button>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

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
        <div id="modal-content" class="pokemon.type">
            <button type ="button" onclick="closeModal()" class="close">&times</button>
            <div class="modalHeader">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <ol>
                    <li>Type 1</li>
                    <li>tipe 2</li>
                </ol>
            </div>
            <img src="${pokemon.photo}">

            <ul class="moves">
                <li>move1</li>
                <li>move2</li>

            <ul class="abilities">
                <li>ab1</li>
                <li>ab2</li>
                <li>ab3</li>
            </ul>

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