const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, 'mysupersecret')
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

		if (!user) {
			throw new Error()
		}

		// pass the fetched user to the request
		req.user = user
		next()
	} catch (e) {
		res.status(401).send({ error: 'You are not logged in!' })
	}
}

module.exports = auth