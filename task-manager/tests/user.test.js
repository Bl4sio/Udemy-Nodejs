const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
	await request(app).post('/users').send({
		name: 'Balazs',
		email: 'balazs@example.com',
		password: 'pass1234%alma'
	}).expect(201)
})