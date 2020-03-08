const request = require('request')

const url = 'https://api.darksky.net/forecast/79bce79fc4c9b5ed7e141dd6492476b3/37.8267,-122.4233?units=si'

request({ url: url, json: true }, (error, response) => {
	const temp = response.body.currently.temperature
	const rainChance = response.body.currently.precipProbability
	console.log(response.body.daily.data[0].summary + '\nIt is currently ' + temp + '°C out. There is a ' + rainChance + '% chance of rain.' )
})