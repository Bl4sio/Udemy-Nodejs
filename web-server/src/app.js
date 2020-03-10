const express = require('express')

const app = express()

app.get('', (req, res) => {
	res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
	res.send([{
		name: 'Balazs',
		age: 28
	},
	{
		name: 'Evi',
		age: 25
	}
	])
})

app.get('/about', (req, res) => {
	res.send('<h1>ABOUT</h1>')
})

app.get('/weather', (req, res) => {
	res.send({
		forecast: 'Clear sky, 15°C',
		location: 'Hungary, Budapest'
	})
})

const server = app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})