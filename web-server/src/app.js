const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views
// Default folder is views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Share the public resources with express
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	// Render a hbs view
	res.render('index', {
		title: 'Weather',
		name: 'Balázs Gőgös'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Balázs Gőgös'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		text: 'You are on the Help screen. Sadly it won\'t help you, because it\'s empty',
		name: 'Balázs Gőgös'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Address is not provided!'
		})
	}
	res.send({
		forecast: 'Clear sky, 15°C',
		location: 'Hungary, Budapest',
		address: req.query.address
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (reg, res) => {
	res.render('404', {
		title: 'Error 404',
		error: 'Help article not found.',
		name: 'Balázs Gőgös'
	})
})

app.get('*', (reg, res) => {
	res.render('404', {
		title: 'Error 404',
		error: 'Page not found.',
		name: 'Balázs Gőgös'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})