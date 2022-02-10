const mongoose = require('mongoose');
const dolaznostSchema = mongoose.Schema({
	user: {
		type: String
	},
    kolegij: {
		type: String
	},
	datum: {
        type: Date
    }
})

module.exports = mongoose.model('Asistent', dolaznostSchema);