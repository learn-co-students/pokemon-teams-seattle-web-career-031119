const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(displayTrainers)
}

function displayTrainers(trainers) {
  console.log('trainers:', trainers);
  trainers.forEach(trainer => {
    addTrainer(trainer)
  })
}

function addTrainer(trainer) {
  let pokemonUl = document.createElement('ul')
  let trainerDiv = document.createElement('div')
  trainerDiv.classList.add('card')

  let mainEl = document.querySelector('main')
  mainEl.appendChild(trainerDiv)

  let nameP = document.createElement('p')
  nameP.textContent = trainer.name

  let addPokemonButton = document.createElement('button')
  addPokemonButton.textContent = 'Add Pokemon'
  addPokemonButton.addEventListener('click', () => {
    addNewPokemon(trainer.id)
    .then( json => {
      if (json !== "error"){
        let pokemonLi = createPokemonLi(json)
        pokemonUl.appendChild(pokemonLi)
      }
    })
  })

  trainer.pokemons.forEach(pokemon => {
    let pokemonLi = createPokemonLi(pokemon)
    pokemonUl.appendChild(pokemonLi)
  })

  trainerDiv.appendChild(nameP)
  trainerDiv.appendChild(addPokemonButton)
  trainerDiv.appendChild(pokemonUl)
}

function addNewPokemon(trainerId) {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
  .then(res => {
    if(!res.ok){
      flagError()
      return "error"
    } else {
      return res.json()
    }
  })
}

function flagError() {
  let errorDiv = document.getElementById('error-bar')
  errorDiv.textContent = "YO WHAT THE FUCK in a truck"
  errorDiv.classList.remove('hidden')
  console.log('error:', errorDiv)
}

function createPokemonLi(pokemon) {
  let pokemonLi = document.createElement('li')
  pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})`

  let releaseButton = document.createElement('button')
  releaseButton.textContent = "Release"
  releaseButton.classList.add('release')
  releaseButton.addEventListener('click', () => {
    deletePokemon(pokemon.id)
    .then(() => {
      pokemonLi.remove()
    })
  })

  pokemonLi.appendChild(releaseButton)
  return pokemonLi
}

function deletePokemon(id) {
  return fetch(POKEMONS_URL + '/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
}

function main () {
  getTrainers()

}

document.addEventListener('DOMContentLoaded', main)
