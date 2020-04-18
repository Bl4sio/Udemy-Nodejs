const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

// socket.emit -> to a client
// io.emit -> to all client
// socket.broadcast.emit -> to all client expect current
// io.to.emit -> to all client in a room
// socket.broadcast.to.emit -> all expect current in a room

io.on('connection', (socket) => {
	socket.on('join', ({ username, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, username, room })

		if (error) {
			return callback(error)
		}

		socket.join(user.room)

		socket.emit('message', generateMessage('Welcome on my Chat-app!'))
		socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined`))

		callback()
	})

	socket.on('sendMessage', (msg, callback) => {
		const filter = new Filter()
		
		if (filter.isProfane(msg)) {
			return callback('Profanity is not allowed!')
		}

		io.to('b').emit('message', generateMessage(msg))
		callback()
	})

	socket.on('sendLocation', (pos, callback) => {
		io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${pos.lat},${pos.lng}`))
		callback()
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id)

		if (user) {
			io.to(user.room).emit('message', generateMessage(`${user.username} has left!`))
		}
	})
})

server.listen(port, () => {
	console.log(`Listening on port ${port}.`)
})