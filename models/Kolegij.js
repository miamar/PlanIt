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
	img: {
		type: String,
		default: 'placeholder.jpg',
	  }
})

module.exports = mongoose.model('Kolegij', kolegijSchema);