const mongoose = require('mongoose');
const aktivnostSchema = mongoose.Schema({
	/*user: {
		type: String
	},*/
	kolegij: {
		type: String
	},
	tipAktivnosti: { 
		type: String,
		enum: ['Kolokvij', 'Zadaća','Završni ispit','Ostalo']
    },
	nazivAktivnosti: {
		type: String
	},
	datumAktivnosti: {
		type: Date
	}
})

module.exports = mongoose.model('Aktivnost', aktivnostSchema);