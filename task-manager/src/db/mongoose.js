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
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Too weak password!')
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

// const me = new User({
// 	name: '  Béla ',
// 	email: 'bela@beka.hu',
// 	password: '  123pass  word4567'
// })

// me.save().then(() => {
// 	console.log(me)
// }).catch((error) => {
// 	console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
})

const myTask = Task({
	description: '  Make dinner ',
	completed: false
})

myTask.save().then(() => {
	console.log(myTask)
}).catch((error) => {
	console.log('Error!', error)
})
