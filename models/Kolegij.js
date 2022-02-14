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
	img:
    {
        data: Buffer, //Buffer allows us to store our image as data in the form of arrays
        contentType: String
    }
})

module.exports = mongoose.model('Kolegij', kolegijSchema);