const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let TRAINERS = []
// let POKEMONS = []
console.log("load trainers")
function loadTrainers(){
	fetch(TRAINERS_URL)
		.then(response => { return response.json() })
		.then(json => {
			displayTrainers(json)
		})
		console.log("end of trainers")
}


function displayTrainers(trainers){
	TRAINERS = trainers
	TRAINERS.forEach(trainer => {
		makeCard(trainer)
	})
	}

function makeCard(trainerName){
	let topDiv = document.createElement('div')
		topDiv.setAttribute("class", "card")

	let main = document.getElementById("main-class")
		topDiv.setAttribute("data-id", trainerName.id)

	let paragraph = document.createElement('p')
		paragraph.textContent= trainerName.name

	let button = document.createElement('button')
		button.setAttribute("data-trainer-id", trainerName.id)
		button.textContent = "Add Pokemon"
		button.addEventListener('click', () => {
			createPokemon(trainerName.id)
			.then(json => {
				addPokemon(json, trainerName, topDiv)


			})
		})

	let ul = document.createElement('ul')

//append li within here so it knows to go in that ul
//otherwise it wouldnt know where to go specifically
	trainerName.pokemons.forEach(pokemon => {
		let li = document.createElement('li')
		li.textContent = `${pokemon.nickname}  (${pokemon.species})`
		ul.appendChild(li)

		let releaseButton = document.createElement('button')
		releaseButton.setAttribute("class", "release")
		releaseButton.setAttribute("data-pokemon-id", pokemon.id)
		releaseButton.textContent = "Release"

		li.appendChild(releaseButton)

		releaseButton.addEventListener('click', () => {
			removePokemon(pokemon.id)
		})
	})

		main.appendChild(topDiv)
		topDiv.appendChild(paragraph)
		topDiv.appendChild(button)
		topDiv.appendChild(ul)
}

function createPokemon(id) {
	return fetch(POKEMONS_URL, {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	body: JSON.stringify({
		'trainer_id': id
	})
}).then(res => {return res.json()})
	.catch(err => {
		displayError(err)
	})
.then(_ => window.location.reload())
}

function addPokemon(pokemon, trainerName, topDiv){

	let li = document.createElement('li')
	li.textContent = `${pokemon.nickname}  (${pokemon.species})`

	ul = topDiv.querySelector("ul")
	ul.appendChild(li)
	let releaseButton = document.createElement('button')
	releaseButton.setAttribute("class", "release")
	releaseButton.setAttribute("data-pokemon-id", pokemon.id)
	releaseButton.textContent = "Release"

	li.appendChild(releaseButton)
}
// function releasePokemon(pokemon, li){
// 	removePokemon(pokemon.id)
// }

function removePokemon(id){
return fetch(POKEMONS_URL + '/' + id, {
	method: 'DELETE'
	})
	.then(res => res.json())
	.catch(err => {
		displayError(err)
	})
	.then(_ => window.location.reload())
}

// function displayError(err){
// 	console.log("err:" err)
// 	let errorBar = document.getElementsById("error")
// 	let message = documetn.getElementById('message')
// 	message.textContent = err.message
// }






//CALLING FUNCTION
loadTrainers()



	// function displayTrainer(trainer)
	// 	document.getElementById()
