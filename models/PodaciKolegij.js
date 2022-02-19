const mongoose = require('mongoose');
const podaciKolegijSchema = mongoose.Schema({
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
	},
	imeAsistenta: { 
		type: String
    },
	prezimeAsistenta: { 
		type: String
    },
	emailAsistenta: {
		type: String
	},
	uredAsistenta: {
		type: String
	},
	kolokvijiBodovi: { 
		type: Number
    },
	ostaloBodovi: {
		type: Number
	}
})

module.exports = mongoose.model('PodaciKolegij', podaciKolegijSchema);