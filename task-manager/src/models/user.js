const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
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
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
})

// just for mongoose, not stored in DB
userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
})

// overwrite a builtin function
// JSON.stringfy is calling the object's toJSON methods
userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

// create a costum function for a user
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'mysupersecret')

	user.tokens = user.tokens.concat({ token })
	await user.save()

	return token
}

// create a costum function for User
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

// middleware for the userSchema
// don't use arrow function, we need 'this' 
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8)
	}

	next()
})

// delete user tasks when the user is removed
userSchema.pre('remove', async function (next) {
	const user = this
	await Task.deleteMany({ owner: user._id })
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User