const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
	console.log('New websocket connection!')

	socket.emit('message', 'Welcome on my Chat-app!')
	socket.broadcast.emit('message', 'A new user has joined!')

	socket.on('sendMessage', (msg) => {
		io.emit('message', msg)
	})
	
	socket.on('sendLocation', (pos) => {
		io.emit('message', `https://google.com/maps?q=${pos.lat},${pos.lng}`)
	})

	socket.on('disconnect', () => {
		io.emit('message', 'A user has left!	')
	})
})

server.listen(port, () => {
	console.log(`Listening on port ${port}.`)
})