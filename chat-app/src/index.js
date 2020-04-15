const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}.`)
})