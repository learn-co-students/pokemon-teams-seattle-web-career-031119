const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function loadPokemons(){
  fetch(POKEMONS_URL)
  .then( res => res.json() )
  .then( json => createTrainers(json) )
}

function loadTrainers() {
  fetch(TRAINERS_URL)
   .then( res => res.json() )
   .then( json => createTrainers(json) )
}
function createTrainers(trainers) {
  console.log(trainers)
  trainers.forEach( trainer => createTrainerDiv(trainer))
}

function createTrainerDiv(trainer) {
  console.log(trainer)
  let main = document.getElementById('main')

  let p = document.createElement('p')
  p.textContent = trainer.name

  let addButton = document.createElement('button')
  addButton.textContent = "Add Pokemon"
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

  trainer.pokemons.forEach ( pokemon => createPokemonLi(pokemon))

function createPokemonLi(pokemon) {
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
}



function releasePokemon(id) {
  fetch (POKEMONS_URL + '/' + id, {
    method: 'DELETE'
  })
    .then(res => res.json())
}

function main() {
    // loadPokemons()
    loadTrainers()

}

main()
//
// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
