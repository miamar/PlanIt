const mongoose = require('mongoose');
const profesorSchema = mongoose.Schema({
	/*user: {
		type: String
	},*/
	kolegij: {
		type: String
	},
	imeProfesora: { 
		type: String
    },
	prezimeProfesora: { 
		type: String
    },
	emailProfesora: {
		type: String
	},
	uredProfesora: {
		type: String
	}
})

module.exports = mongoose.model('Profesor', profesorSchema);