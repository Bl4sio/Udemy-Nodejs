// C:\Users\Balázs\mongodb\bin\mongod.exe --dbpath=C:\Users\Balázs\mongodb-data

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})