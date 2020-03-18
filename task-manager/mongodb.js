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
	
	// db.collection('users').updateOne({
	// 	_id: new ObjectID('5e70e1080751584578da1372')
	// }, {
	// 	$inc: {
	// 		age: 3
	// 	}
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	db.collection('tasks').updateMany({
		completed: false
	}, {
		$set: {
			completed: true
		}
	}).then((result) => {
		console.log(result.modifiedCount)
	}).catch((error) => {
		console.log(error)
	})
})