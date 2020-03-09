const request = require('request')

const forecast = (lat, lng, callback) => {
	const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + lat + ',' + lng + '?units=si'

	request({ url: url, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (response.body.error) {
			callback('Unable to find location!', undefined)
		} else {
			const temp = response.body.currently.temperature
			const rainChance = response.body.currently.precipProbability
			callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + temp + '°C out. There is a ' + rainChance + '% chance of rain.')
		}
	})
}

module.exports = forecast