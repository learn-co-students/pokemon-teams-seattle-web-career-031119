const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function loadPokemons(){
  fetch(POKEMONS_URL)
  .then( res => res.json() )
  .then( json => createTrainers(json) )
}

function loadTrainers(){
  fetch(TRAINERS_URL)
   .then( res => res.json() )
   .then( json => createTrainers(json) )
}

function createTrainers(trainers) {
  trainers.forEach( trainer => createTrainerDiv(trainer))
}

function createTrainerDiv(trainer) {
  // console.log(trainer)
  let main = document.getElementById('main')

  let p = document.createElement('p')
  p.textContent = trainer.name

  let addButton = document.createElement('button')
  addButton.textContent = "Add Pokemon"
  addButton.addEventListener('click', handleAdd)
  addButton.setAttribute('data-trainer-id', trainer.id)

  let div = document.createElement('div')
  div.classList.add( "card" )
  div.setAttribute('data-id', trainer.id)

  let ul = document.createElement('ul')
  ul.classList.add("pokemon-list")

  main.appendChild(div)
  div.appendChild(p)
  div.appendChild(addButton)
  div.appendChild(ul)

  trainer.pokemons.forEach ( pokemon => createPokemonLi(pokemon, div))
}

function createPokemonLi(pokemon, div) {
  let ul = div.querySelector('ul')

  let li = document.createElement('li')
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  let releaseButton = document.createElement('button')
  releaseButton.classList.add('release')
  releaseButton.addEventListener('click', () => {
    releasePokemon(pokemon.id)
    li.remove()
  })
  releaseButton.textContent = "Release"
  releaseButton.setAttribute("data-pokemon-id", pokemon.id)

  li.appendChild(releaseButton)
  ul.appendChild(li)
}

function handleAdd (ev) {
  let trainerId = ev.target.attributes['data-trainer-id'].value
  let div = ev.target.parentNode
  let liNumber = div.querySelectorAll('li').length

  let pokemon = fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': parseInt(trainerId)
    })
  })
    .then( res => res.json() )
    .then( pokemon => createPokemonLi(pokemon, div) )
}

function releasePokemon(id) {
  fetch (POKEMONS_URL + '/' + id, {
    method: 'DELETE'
  })
    .then( res => res.json() )
}


function main() {
    loadTrainers()
}

main()
