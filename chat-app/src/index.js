const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
	console.log('New websocket connection!')

	socket.emit('message', generateMessage('Welcome on my Chat-app!'))
	socket.broadcast.emit('message', generateMessage('A new user has joined!'))

	socket.on('sendMessage', (msg, callback) => {
		const filter = new Filter()
		
		if (filter.isProfane(msg)) {
			return callback('Profanity is not allowed!')
		}

		io.emit('message', generateMessage(msg))
		callback()
	})

	socket.on('sendLocation', (pos, callback) => {
		io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${pos.lat},${pos.lng}`))
		callback()
	})

	socket.on('disconnect', () => {
		io.emit('message', generateMessage('A user has left!'))
	})
})

server.listen(port, () => {
	console.log(`Listening on port ${port}.`)
})