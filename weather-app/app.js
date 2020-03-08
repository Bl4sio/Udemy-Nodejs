const request = require('request')

const url = 'https://api.darksky.net/forecast/79bce79fc4c9b5ed7e141dd6492476b3/37.8267,-122.4233'

request({ url: url }, (error, response) => {
	const data = JSON.parse(response.body)
	console.log(data.currently)
})