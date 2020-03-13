const request = require('request')



const forecast = (lat, lng, callback) => {
	const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + lat + ',' + lng + '?units=si'

	request({ url: url, json: true}, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (body.error) {
			callback('Unable to find location!', undefined)
		} else {
			console.log(body)
			const temp = body.currently.temperature
			const rainChance = body.currently.precipProbability
			const windSpeed = body.currently.windSpeed
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + '°C out. There is a ' + rainChance + '% chance of rain. Wind speed is '+ windSpeed + ' km/h,')
		}
	})
}

module.exports = forecast