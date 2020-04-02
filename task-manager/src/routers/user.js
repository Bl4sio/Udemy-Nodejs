const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (e) {
		res.status(400).send(e)
	}
})

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (e) {
		res.status(400).send()
	}
})

router.get('/users/me', auth, async (req, res) => {
	// req.user is set by auth
	res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)

		if (!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch (e) {
		res.status(500).send()
	}
})

router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({'error': 'Invalid updates!'})
	}

	try {
		const user = await User.findById(req.params.id)
		updates.forEach((update) => user[update] = req.body[update])
		await user.save()

		// this bypass mongoose and the middleware
		// const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

		if (!user) {
			return res.status(404).send()
		}

		res.send(user)
	} catch (e) {
		// only handle as validation error
		res.status(400).send(e)
	}
})

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if (!user) {
			return res.status(404).send()
		}

		res.send(user)
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router