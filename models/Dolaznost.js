const mongoose = require('mongoose');
const dolaznostSchema = mongoose.Schema({
    kolegij: {
		type: String
	},
	datum: {
        type: Date
    }
})

module.exports = mongoose.model('Dolaznost', dolaznostSchema);