const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => displayTrainers(json))

function displayTrainers(json) {
  const container = document.getElementById('container')
  for (i = 0; i < json.length; i++) {
    const div = makeCard(json, i)
    container.appendChild(div)

    const p = makeTrainer(json, i)
    div.appendChild(p)

    const addPokemonButton = makePokemonButton(json, i)
    div.appendChild(addPokemonButton)

    const ul = document.createElement('ul')
    ul.setAttribute('data-trainer-id', json[i].id)
    div.appendChild(ul)

    for(j = 0; j < json[i].pokemons.length; j++) {
      const li = addPokemons(json, i, j)
      ul.appendChild(li)
    }
  console.log('json:', json)
  console.log('div:', div)
  }
}

// Helper functions for displayTrainers
function makeCard(json, i) {
  const div = document.createElement('div')
  div.classList.add('card')
  div.setAttribute('data-id', json[i].id)
  return div
}

function makeTrainer(json, i) {
  const p = document.createElement('p')
  p.textContent = json[i].name
  return p
}

function makePokemonButton(json, i) {
  const addPokemonButton = document.createElement('button')
  addPokemonButton.textContent = 'Add Pokemon'
  addPokemonButton.setAttribute('data-trainer-id', json[i].id)
  addPokemonButton.addEventListener('click', addNewPokemon)
  return addPokemonButton
}

function addPokemons(json, i, j) {
  const li = document.createElement('li')
  li.textContent = json[i].pokemons[j].nickname + ' (' + json[i].pokemons[j].species + ') '
  const releaseButton = document.createElement('button')
  releaseButton.textContent = "Release"
  releaseButton.classList.add('release')
  releaseButton.setAttribute('data-pokemon-id', json[i].pokemons[j].id)
  li.appendChild(releaseButton)
  releaseButton.addEventListener('click', releasePokemon)
  return li
}
// end helper funcs for displayTrainers

// Event listeners for the buttons
function addNewPokemon(ev) {
  const ul = ev.target.nextSibling
  const c = ul.childElementCount
  if (c < 6) {
    const id = ul.getAttribute('data-trainer-id')
    pokemonPost(id)
    .then( newPokemon => {
      console.log('newpokemon:', newPokemon)
      const li = document.createElement('li')
      li.textContent = newPokemon.nickname + ' (' + newPokemon.species + ')'
      const releaseButton = document.createElement('button')
      releaseButton.textContent = "Release"
      releaseButton.classList.add('release')
      releaseButton.setAttribute('data-pokemon-id', newPokemon.id)
      releaseButton.addEventListener('click', releasePokemon)
      li.appendChild(releaseButton)
      ul.appendChild(li)
    })
  }
}

function releasePokemon(ev) {
  const id = ev.target.getAttribute('data-pokemon-id')
  ev.target.parentElement.remove()
  fetch (POKEMONS_URL + '/' + id, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .catch(err => {
    displayError(err)
  })
}
// end of event listeners

//adding a pokemon fetch
function pokemonPost(id) {
  return fetch (POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': id
    })
  })
  .then(res => res.json())
}

function displayError(err) {
  console.log('err:', err)
  //setInterval(function () {

  //}, 10);
  //setTimeout(function () {

  //}, 10);
  //make an error bar
}
