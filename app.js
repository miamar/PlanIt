var express = require('express');
var app = express();
app.listen(3000, () => {
   console.log('Server listening on 3000');
})

const mongoose = require('mongoose');
mongoose.connect('URL', () => {
   console.log('Connected to Mongo DB Successfully!!');
})