const mongoose = require('mongoose');
mongoose.pluralize(null);
const userSchema = mongoose.Schema({
     name: {
        type: String, 
        required: true
     },
     surname: {
        type: String,  
        required: true
     },
     email: { 
         type: String, 
         unique: true, 
         required: true 
    },
     userName: { 
         type: String, 
         unique: true,
         required: true 
    },
     password: { 
         type: String, 
         required: true 
    }
})

module.exports = mongoose.model('User', userSchema);