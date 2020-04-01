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

const bcrypt = require('bcryptjs')

const myFunc = async () => {
	const password = 'alma314$'
	const hashedPassword = await bcrypt.hash(password, 8)

	console.log(password)
	console.log(hashedPassword)

	const isMatch = await bcrypt.compare("alma314$", hashedPassword)
	console.log(isMatch)
}

myFunc()