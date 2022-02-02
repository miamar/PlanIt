const mongoose = require('mongoose');
const kolegijSchema = mongoose.Schema({
	user: {
		type: String,
	},
	imeKolegija: { 
		type: String
    },
	profesorPredavanje: {
		type: String
	},
	asistentVjezbe:{
		type: String
	},
	modelNastave: {
		type: String
	}
})

module.exports = mongoose.model('Kolegij', kolegijSchema);