const mongoose = require('mongoose');
const toDoSchema = mongoose.Schema({
	user: {
	  type: String
    },
	textToDo: { 
		type: String
	}
})

module.exports = mongoose.model('ToDo', toDoSchema);

