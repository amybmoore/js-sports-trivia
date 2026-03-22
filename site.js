
// import the utility functions "decodeHtml" and "shuffle"
//import { createElement } from 'react' - this line is breaking the code
import { decodeHtml, shuffle } from './utils.js' 

// IIFE (so we can use async/await)
(async () => {

	// todo: create your "getNextQuestion" function
	// Inside of the IIFE, create an arrow function called getNextQuestion that will get the data from the OpenTDB API and parse the JSON response.

	// get the elements from the DOM
	const questionElement = document.querySelector('#question')
	const answersElement = document.querySelector('#answers')
	const nextQuestionElement = document.querySelector('#nextQuestion')
	const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'

	// fetch function called getNextQuestion:
	const getNextQuestion = async url => {
		const response = await fetch(url)
		const json = await response.json()
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	}
	// Test the connection to the url:
	// console.log(await getNextQuestion(url))
	
	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => { 
		questionElement.textContent = decodeHtml(question)

		answersElement.innerHTML = ''   // clear previous answers

		// Loop through answers and add them to created buttons
		answers.forEach(answer => {
			const button = document.createElement('button')
			button.textContent = decodeHtml(answer)
			answersElement.append(button)

			// Check to see if answer is correct when user clicks an answer button
			button.addEventListener('click', () => {
				if (answer === correct) {
    			button.classList.add('correct')
    			answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
    			alert('Correct!')
    			return
				}
				button.disabled = true
				alert('Incorrect!')
			})
		})
	}
	// todo: add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => {
		renderQuestion(await getNextQuestion(url))
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)

	})

})()

// mimic a click on the "nextQuestion" button to show the first question
//nextQuestionElement.click()
