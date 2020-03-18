// C:\Users\Balázs\mongodb\bin\mongod.exe --dbpath=C:\Users\Balázs\mongodb-data
// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database')
	}

	const db = client.db(databaseName)

	// db.collection('users').findOne({ _id: new ObjectID("5e70e1080751584578da1372") }, (error, user) => {
	// 	if (error) {
	// 		return console.log('Unable to fetch')
	// 	}

	// 	console.log(user)
	// })

	// db.collection('users').find({ age: 28 }).toArray((error, users) => {
	// 	console.log(users)
	// })

	db.collection('tasks').findOne({ _id: new ObjectID("5e70dc1378c0d148a8f89b16") }, (error, task) => {
		if (error) {
			return console.log('Unable to fetch')
		}

		console.log(task)
	})

	db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
		console.log(tasks)
	})
})