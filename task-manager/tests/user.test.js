const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
	name: 'Béla',
	email: 'bela@test.com',
	password: 'belapass123'
}

beforeEach(async () => {
	await User.deleteMany()
	await new User(userOne).save()
})

test('Should signup a new user', async () => {
	await request(app).post('/users').send({
		name: 'Balazs',
		email: 'balazs@example.com',
		password: 'pass1234%alma'
	}).expect(201)
})

test('Should login existing user', async () => {
	await request(app).post('/users/login').send({
		email: userOne.email,
		password: userOne.password
	}).expect(200)
})

test('Should not login nonexisting user', async () => {
	await request(app).post('/users/login').send({
		email: 'Emanuel',
		password: 'sajt1234'
	}).expect(400)
})