const mongoose = require('mongoose');
const asistentSchema = mongoose.Schema({
	/*user: {
		type: String
	},*/
	kolegij: {
		type: String
	},
	imePrezimeAsistenta: { 
		type: String
    },
	emailAsistenta: {
		type: String
	},
	uredAsistenta: {
		type: String
	}
})

module.exports = mongoose.model('Asistent', asistentSchema);