const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + process.env.GOOGLE_API_KEY + '&language:en'

	request({url: url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to location services!', undefined)
		} else if (body.error_message) {
			callback('Unable to find location!', undefined)
		} else {
			callback(undefined, {
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng,
				location: body.results[0].formatted_address
			})
		}
	})
}

module.exports = geocode