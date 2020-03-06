const chalk = require('chalk')
const fs = require('fs')

const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find( note => note.title === title)
	if ( note ) {
		console.log(chalk.inverse(note.title))
		console.log(note.body)
	} else {
		console.log(chalk.red.inverse('No note found!'))
	}
}

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find( (note) => note.title === title )
	
	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse('New notes added!'))
	} else {
		console.log(chalk.red.inverse('Note title alread exists!'))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const updatedNotes = notes.filter( (note) => note.title !== title )
	if (notes.length === updatedNotes.length) {
		console.log( chalk.red.inverse('No note found!') )
	} else {
		console.log( chalk.green.inverse('Note removed!') )
	}
	saveNotes(updatedNotes)
}

const listNotes = () => {
	const notes = loadNotes()
	console.log(chalk.yellow.inverse('Your notes'))
	notes.forEach(note => console.log(note.title) );
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	readNote: readNote,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
}