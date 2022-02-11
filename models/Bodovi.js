const mongoose = require('mongoose');
const bodoviSchema = mongoose.Schema({
	/*user: {
		type: String
	},*/
    kolegij: {
		type: String
	},
	kolokvijiBodovi: { 
		type: Number
    },
	ostaloBodovi: {
		type: Number
	}
	/* ne treba polje za to jer će se kod ispisa računati ukupno
    ukupniBodovi: {
		type: Number
	}
	*/
})

module.exports = mongoose.model('Bodovi', bodoviSchema);