const mongoose = require('mongoose');
const kolegijSchema = mongoose.Schema({
	user: {
		type: String,
	},
	nazivKolegija: { 
		type: String
    },
	dvoranaPredavanje: {
		type: String
	},
	dvoranaVjezbe:{
		type: String
	},
	modelNastave: {
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

module.exports = mongoose.model('Kolegij', kolegijSchema);