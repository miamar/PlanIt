const mongoose = require('mongoose');
const toDoSchema = mongoose.Schema({
	user: {
	  type: String,
	  ref: 'User'
    },
	textToDo: { 
		type: String
	}
})

module.exports = mongoose.model('ToDo', toDoSchema);

