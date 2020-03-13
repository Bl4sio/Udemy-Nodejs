require('dotenv').config()
const https = require('https')
const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/47.4757,19.0616?units=si'

const request = https.request(url, (res) => {
	let data = ''

	res.on('data', (chuck) => {
		data = data + chuck.toString()
	})

	res.on('end', () => {
		const body = JSON.parse(data)
		console.log(body)
	})
})

request.on('error', (error) => {
	console.log('An error:', error)
})

request.end()