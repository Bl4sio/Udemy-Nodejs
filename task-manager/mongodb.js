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

	// db.collection('users').deleteMany({
	// 	age: 28
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	db.collection('tasks').deleteOne({
		_id: new ObjectID("5e70dc1378c0d148a8f89b15")
	}).then((result) => {
		console.log(result)
	}).catch((error) => {
		console.log(error)
	})
})