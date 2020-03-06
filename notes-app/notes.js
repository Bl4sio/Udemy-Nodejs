const chalk = require('chalk')
const fs = require('fs')

const getNotes = function() {
	return 'Your notes...'
}

const addNote = function (title, body) {
	const notes = loadNotes()
	const duplicateNotes = notes.filter( function (note) {
		return note.title === title
	} )
	
	if (duplicateNotes.length === 0) {
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

const removeNote = function (title) {
	const notes = loadNotes()
	const updatedNotes = notes.filter( function (note) {
		return note.title !== title
	})
	if (notes.length === updatedNotes.length) {
		console.log( chalk.red.inverse('No note found!') )
	} else {
		console.log( chalk.green.inverse('Note removed!') )
	}
	saveNotes(updatedNotes)
}

const saveNotes = function(notes) {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote
}