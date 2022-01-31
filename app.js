var express = require('express');
const mongoose = require('mongoose');
var express = require('express');

var app = express();

/* SPAJANJE NA SERVER */
app.listen(3030, () => {
	console.log('Server listening on 3030.');
})

mongoose.connect('mongodb+srv://anaanic:<password>@planitcluster.bifgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log('Connected to Mongo DB Successfully!!');
 })
 
