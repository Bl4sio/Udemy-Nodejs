require('dotenv').config()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
	console.log('Please provide an address!')
	return
}


geocode(address, (error, {lat, lng, location} = {} ) => {
	if (error) {
		console.log(error)
		return
	}

	forecast(lat, lng, (error, forecastData) => {
		if (error) {
			console.log(error)
			return
		}

		console.log(location)
		console.log(forecastData)
	})
})