const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
})

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Invalid e-mail address!')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age can\'t be negative!')
			}
		}
	}
})

const me = new User({
	name: '  Béla ',
	email: 'bela@beka.hu'
})

me.save().then(() => {
	console.log(me)
}).catch((error) => {
	console.log('Error!', error)
})

const Task = mongoose.model('Task', {
	description: {
		type: String
	},
	completed: {
		type: Boolean
	}
})

// const myTask = Task({
// 	description: 'Clean the windows',
// 	completed: false
// })

// myTask.save().then(() => {
// 	console.log(myTask)
// }).catch((error) => {
// 	console.log('Error!', error)
// })
