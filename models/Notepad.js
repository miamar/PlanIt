const mongoose = require('mongoose');
const notepadSchema = mongoose.Schema({
	user: {
		type: String,
	},
	textNotepad: { 
		type: String
    }
})

module.exports = mongoose.model('Notepad', notepadSchema);