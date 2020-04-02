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