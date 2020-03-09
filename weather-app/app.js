require('dotenv').config()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
	console.log('Please provide an address!')
	return
}

geocode(address, (error, data) => {
	if (error) {
		console.log(error)
		return
	}

	forecast(data.lat, data.lng, (error, forecastData) => {
		if (error) {
			console.log(error)
			return
		}

		console.log(data.location)
		console.log(forecastData)
	})
})