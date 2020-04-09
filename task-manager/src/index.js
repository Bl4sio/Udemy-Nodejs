const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
	dest: 'images',
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(doc|docx)$/)) {
			return cb(new Error('Please upload a Word document'))
		}

		cb(undefined, true)
		// cb(new Error('File must be a PDF'))
		// cb(undefined, true)
		// cb(unescape, false)
	}
})

app.post('/upload', upload.single('uploadName'), (req, res) => {
	res.send()
})


app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Listening on port ' + port)
})