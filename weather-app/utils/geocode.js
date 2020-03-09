const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + process.env.GOOGLE_API_KEY + '&language:en'

	request({url: url, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to location services!', undefined)
		} else if (response.body.error_message) {
			callback('Unable to find location!', undefined)
		} else {
			callback(undefined, {
				lat: response.body.results[0].geometry.location.lat,
				lng: response.body.results[0].geometry.location.lng,
				location: response.body.results[0].formatted_address
			})
		}
	})
}

module.exports = geocode