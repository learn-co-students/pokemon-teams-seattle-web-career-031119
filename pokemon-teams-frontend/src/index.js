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
	})

		main.appendChild(topDiv)
		topDiv.appendChild(paragraph)
		topDiv.appendChild(button)
		topDiv.appendChild(ul)
}









//CALLING FUNCTION
loadTrainers()


	// function displayTrainer(trainer)
	// 	document.getElementById()
