const mongoose = require('mongoose');
const aktivnostSchema = mongoose.Schema({
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
		type: String
	}
})

module.exports = mongoose.model('Aktivnost', aktivnostSchema);