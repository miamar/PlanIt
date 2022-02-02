const mongoose = require('mongoose');
const predavanjeSchema = mongoose.Schema({
	user: {
		type: String,
	},
	imeKolegija: { 
		type: String
    },
    dvoranaPredavanje: { 
        type: String
    },
	predavanjeVjezbe: {
		type: String,
		enum: ['Predavanje', 'Vježbe']
	},
	predavac: {
		type: String
	}
})

module.exports = mongoose.model('Predavanje', predavanjeSchema);