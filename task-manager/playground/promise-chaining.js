require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e8216c7495d261f50faea9c

User.findByIdAndUpdate('5e7ceb3302a0043d082970ba', { age: 2 }, { new: true }).then((user) => {
	console.log(user)
	return User.countDocuments({ age: 2 })
}).then((res) => {
	console.log(res)
}).catch((e) => {
	console.log(e)
})