const path = require('path')
const express = require('express')


const app = express()
const publicDirPath = path.join(__dirname, "../public")

// Setup hbs for express
// They had to be in the views folder
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	// Render a hbs view
	res.render('index', {
		title: 'Weather',
		name: 'Balázs Gőgös'
	})
})

app.get('/about', (req, res) => {
	res.render('about',{
		title: 'About Me',
		name: 'Balázs Gőgös'
	})
})

app.get('/help', (req, res) => {
	res.render('help',{
		text: 'You are on the Help screen. Sadly it won\'t help you, because it\'s empty'
	})
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