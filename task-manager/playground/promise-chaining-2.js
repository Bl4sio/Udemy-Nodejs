require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e7cebf350f04042c0c9a10b').then(() => {
// 	return Task.countDocuments({ completed: false })
// }).then((res) => {
// 	console.log(res)
// }).catch((e) => {
// 	console.log(e)
// })

const deleteTaskAndCount = async (id) => {
	await Task.findByIdAndDelete(id)
	return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('5e821919603d201e946a6cd0').then((count) => {
	console.log(count)
}).catch(e => console.log(e))