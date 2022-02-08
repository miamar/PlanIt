const mongoose = require('mongoose');
const toDoSchema = mongoose.Schema({
	textToDo: { 
		type: String
	}
})

module.exports = mongoose.model('ToDo', toDoSchema);

/*user: {
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
}*/