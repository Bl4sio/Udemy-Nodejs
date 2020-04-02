const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Listening on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunc = async () => {
	const token = jwt.sign({ _id: 'qwe123' }, 'thisisasecret', { expiresIn: '2 days' })
	console.log(token)

	const data = jwt.verify(token, 'thisisasecret')
	console.log(data)
}

myFunc()