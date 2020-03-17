// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database')
	}

	const db = client.db(databaseName)

	// db.collection('users').insertOne({
	// 	name: 'Balazs',
	// 	age: 28
	// }, (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert user')
	// 	}

	// 	console.log(result.ops)
	// })

	// db.collection('users').insertMany([
	// 	{
	// 		name: 'Evi',
	// 		age: 25
	// 	},
	// 	{
	// 		name: 'Attila',
	// 		age: 28
	// 	}
	// ], (error, result) => {
	// 	if (error) {
	// 		return console.log('Unable to insert new users!')
	// 	}

	// 	console.log(result.ops)
	// })

	db.collection('tasks').insertMany([
		{
			desciption: 'Shaving',
			completed: true
		},
		{
			desciption: 'Cooking dinner',
			completed: true
		},
		{
			desciption: 'Completing my CV',
			completed: false
		}
	], (error, result) => {
		if (error) {
			return console.log('Unable to add tasks!')
		}
		console.log(result.ops)
	})
})