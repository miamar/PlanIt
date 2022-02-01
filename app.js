var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
var express = require('express');
app.set('view engine', 'ejs');

const User = require('./models/User.js');

var app = express();

/* SPAJANJE NA SERVER */
app.listen(3030, () => {
	console.log('Server listening on 3030.');
})

mongoose.connect('mongodb+srv://anaanic:ana123@planitcluster.bifgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log('Connected to Mongo DB Successfully!!');
 })

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 const router = express.Router();

 router.post('/user', (request, response) => {
	const user = new User({
	   userName : request.body.userName,
	   password : request.body.password,
	   email : request.body.email
	});
	bcrypt.hash(user.password, 10, function (err, hash){
	  if (err) {
		  return next(err);
	  }
	  user.password = hash;
	  user.save().then(data => {
		  console.log("Successfully created a new User");
		  //response.redirect("/");
	  }).catch(error => {
		  console.log("Error - user not saved!");
		  response.redirect("/signup");
	  })
  })
}) 

router.get('/signup', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/registracija.html'));
});


module.exports = router;
 
