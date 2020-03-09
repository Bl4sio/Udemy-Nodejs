require('dotenv').config()
const request = require('request')

const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/37.8267,-122.4233?units=si'

request({ url: url, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to weather services!')
	} else if (response.body.error) {
		console.log('Unable to find location!')
	} else {
		const temp = response.body.currently.temperature
		const rainChance = response.body.currently.precipProbability
		console.log(response.body.daily.data[0].summary + '\nIt is currently ' + temp + '°C out. There is a ' + rainChance + '% chance of rain.' )
	}
})

const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=Budapest&key=' + process.env.GOOGLE_API_KEY + '&language:en'

request({ url: geocodeURL, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to location services!')
	} else if (response.body.error_message) {
		console.log('Unable to resolve address!')
	} else {
		const lat = response.body.results[0].geometry.location.lat
		const lng = response.body.results[0].geometry.location.lng
		console.log(lat, lng)
	}
})