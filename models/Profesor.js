const mongoose = require('mongoose');
const profesorSchema = mongoose.Schema({
	user: {
		type: String
	},
	kolegij: {
		type: String
	},
	imePrezimeProfesora: { 
		type: String
    },
	emailProfesora: {
		type: String
	},
	ured: {
		type: String
	}
})

module.exports = mongoose.model('Profesor', profesorSchema);