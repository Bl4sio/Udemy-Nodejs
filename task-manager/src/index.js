const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		return res.send('GET requests are disabled')
// 	}
// 	next()
// })

// app.use((req, res, next) => {
// 	res.status(503).send('Sorry, the server is under construction!')
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Listening on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
	// const task = await Task.findById( "5e8866930833ad4ef0478b84" )
	// await task.populate('owner').execPopulate()
	// console.log(task.owner)

	const user = await User.findById('5e8865f4b0093d3c300b3d84')
	await user.populate('tasks').execPopulate()
	console.log(user.tasks)
}

main()