const mongoose = require('mongoose');
const toDoSchema = mongoose.Schema({
	user: {
		type: String
	},
	textToDo: { 
		type: String
    },
	izvrsena: {
		type: Boolean
	},
	datumIzvrsena: {
		type: Date
	}
})

module.exports = mongoose.model('ToDo', toDoSchema);