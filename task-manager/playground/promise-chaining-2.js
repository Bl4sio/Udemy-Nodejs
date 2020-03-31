require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e7cebf350f04042c0c9a10b').then(() => {
	return Task.countDocuments({ completed: false })
}).then((res) => {
	console.log(res)
}).catch((e) => {
	console.log(e)
})