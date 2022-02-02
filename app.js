var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');

const User = require('./models/User.js');

var app = express();

/* SPAJANJE NA SERVER */
app.listen(3030, () => {
	console.log('Server listening on 3030.');
})

/* SPAJANJE NA MONGODB */
//mongoose.connect('mongodb+srv://anaanic:ana123@planitcluster.bifgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    //console.log('Connected to Mongo DB Successfully!!');})

mongoose.connect(
	'mongodb+srv://anaanic:ana123@planitcluster.bifgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to MongoDB!');
});

app.use( express.urlencoded({ extended: true }));
app.use(express.json());
//Server ne prepoznaje statičke fileove pa ih se mora staviti u public i označiti s express.static()
app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, '/public')));

const router = express.Router();

router.use(session({
	secret: 'any key is fine',
	resave: true,
	saveUninitialized: true,
}))

router.use(passport.initialize());
router.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

// PROVJERA POSTOJI LI KORISNIK
passport.use(new LocalStrategy(
   { usernameField: "userName" },
   (userName, password, done) => {
     User.findOne({userName: userName}, (err, userData) => {
      let passwordCheck = bcrypt.compareSync(password, userData.password);
	  if (userName === userData.userName && passwordCheck) {
		  return done(null, userData)
		  }else{
			  return done(null, false, { message: 'Korisnik ne postoji.'})
		  }
	    })
    }
));

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		 req.login(user, (err) => {
		 res.redirect('/index');
		 })
	})
	(req, res, next);
})

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
		  response.redirect("/");
	  }).catch(error => {
		  console.log("Error - user not saved!");
		  response.redirect("/signup");
	  })
  })
})

passport.serializeUser((user, done) => {
	done(null, user.id);
	console.log("Serializing user: ", user);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		loggedInUser = user;
		done(err, user);
	});
	console.log("Deserializing user:", loggedInUser);
});

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/prijava.html'));
});

router.get('/signup', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/registracija.html'));
});

router.get('/index', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/index.html'));
});

const { response } = require('express');
app.set('view engine', 'ejs');

router.use(function(req, res, next) {
    console.log('-- session --');
    console.dir(req.session);
    next()
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
	console.log("logout", req.user);
});

app.use(router);

module.exports = router;
 
