const mongoose = require('mongoose');
const bodoviSchema = mongoose.Schema({
	user: {
		type: String
	},
    nazivKolegija: {
		type: String
	},
	kolokvijiBodovi: { 
		type: Number
    },
	ostaloBodovi: {
		type: Number
	},
    ukupniBodovi: {
		type: Number
	}
})

module.exports = mongoose.model('Bodovi', bodoviSchema);