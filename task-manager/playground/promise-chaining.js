require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e7ceb3302a0043d082970ba', { age: 2 }, { new: true }).then((user) => {
// 	console.log(user)
// 	return User.countDocuments({ age: 2 })
// }).then((res) => {
// 	console.log(res)
// }).catch((e) => {
// 	console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age: age })
	const count = await User.countDocuments({ age: age })
	return count
}

updateAgeAndCount('5e7ceaf775a8472ebc1a625b', 3).then((count) => {
	console.log(count)
}).catch(e => console.log(e))