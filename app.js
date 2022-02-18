var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
var fs = require('fs');
require('dotenv/config');

const User = require('./models/User.js');
const ToDo = require('./models/ToDo.js');
const Kolegij = require('./models/Kolegij.js');
const Profesor = require('./models/Profesor.js');
const Asistent = require('./models/Asistent.js');
const Bodovi = require('./models/Bodovi.js');
const Dolaznost = require('./models/Dolaznost.js');
const Aktivnost = require('./models/Aktivnost.js');

var app = express();

app.use( express.urlencoded({ extended: true }));
app.use(express.json());
//Server ne prepoznaje statičke fileove pa ih se mora staviti u public i označiti s express.static()
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


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

//KREIRANJE KORISNIKA
router.post('/user', (request, response) => {
	const user = new User({
		name : request.body.name,
		surname : request.body.surname,
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

//TODO LISTA mojprofil.ejs
app.get("/mojprofil", function (req, res) {
	ToDo.find({}).exec(function(err, newListItem){
		   if(err) throw(err);
		  res.render("mojprofil", { newListItem});
	});
});

app.post("/list", function (req, res) {
  i = req.body.n;
  const item = new ToDo({
	  textToDo: i
  });
  item.save();
  res.redirect("/mojprofil");
});

//Kada se klikne na checkbox bilješka automatski se briše iz baze
app.post("/deleteItem", function(req,res){
	ToDo.findByIdAndRemove(req.body.checkbox, function (err){
		if(!err){
			console.log("Bilješka je izbrisana!");
			res.redirect("/mojprofil");
		}
	})
});

//TODO LISTA index.ejs
app.get("/index", function (req, res) {
	ToDo.find({}).exec(function(err, newListItem){
		   if(err) throw(err);
		  res.render("index", { newListItem});
	});
});

app.post("/deleteItemIndex", function(req,res){
	ToDo.findByIdAndRemove(req.body.checkbox, function (err){
		if(!err){
			console.log("Bilješka je izbrisana!");
			res.redirect("/index");
		}
	})
});


router.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/prijava.html'));
});

router.get('/signup', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/registracija.html'));
});

router.get('/raspored', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/raspored.html'));
});

router.get('/obavijesti', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/obavijesti.html'));
});

router.get('/urediprofil', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/urediprofil.html'));
});

router.get('/unosPodatakaKolegiji', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosPodatakaKolegiji.html'));
});

router.get('/unosRasporeda', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosRasporeda.html'));
});
/*
router.get('/podaciKolegij', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/podaciKolegij.html'));
});
*/
const { response } = require('express');
const { readSync } = require('fs');
app.set('view engine', 'ejs');

// STVARANJE NOVOG KOLEGIJA
router.post('/unosKolegija', function(req, res) {
	const kolegij = new Kolegij({
			user : req.user.id,
			nazivKolegija : req.body.nazivKolegija,
			dvoranaPredavanje : req.body.dvoranaPredavanje,
			dvoranaVjezbe : req.body.dvoranaVjezbe,
			modelNastave : req.body.modelNastave
		});
		kolegij.save().then(data => {
			console.log("Uspješno kreiran novi kolegij!");
		}).catch(error => {
			console.log("Error")
		})
	res.redirect('/kolegiji');
})

router.get('/unosKolegija', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/' + 'unosKolegija.html'));
});

//DOHVAĆANJE KOLEGIJA
router.get('/kolegiji', function(req, res) {
	Kolegij.find({user: req.user.id}).exec(function(err, kolegiji){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('kolegiji.ejs', { "kolegiji" : kolegiji });
	});
});

//BRISANJE KOLEGIJA
router.get('/brisanjeKolegija', function(req, res) {
	Kolegij.find({/*user: req.user.id*/}).exec(function(err, kolegiji){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('brisanjeKolegija.ejs', { "kolegiji" : kolegiji });
	});
});
router.get("/izbrisiKolegij/:id", (req,res,next)=>{
	var kolegij = new Kolegij(req.body);
    Kolegij.findByIdAndRemove(req.params.id ,{useFindAndModify : false}, (err, kolegij)=> {
       if(err) console.log(err)
       console.log("Izbrisan kolegij: ", Kolegij);
    })
  res.redirect('/brisanjeKolegija');
})

//UNOS PROFESORA
router.post("/unosProfesora", function(req, res) {
	const profesor = new Profesor({
			//kolegij: req.kolegij.id,
			imeProfesora: req.body.imeProfesora,
			prezimeProfesora: req.body.prezimeProfesora,
			emailProfesora: req.body.emailProfesora,
			uredProfesora: req.body.uredProfesora
		});
		profesor.save().then(data => {
			console.log("Uspješno unesen novi profesor");
		}).catch(error => {
			console.log("Profesor nije spremljen")
		})
	res.redirect("/podaciKolegij");
})

router.get("/unosProfesora", function(req, res){
	res.sendFile(path.join(__dirname + "/views" + "/unosProfesora.html"));
});

//DOHVAĆANJE PODATAKA O PROFESORU
router.get('/podaciKolegij', function(req, res) {
	Profesor.find({}).exec(function(err, profesori){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('podaciKolegij.ejs', { "profesori" : profesori });
	});
});

//UREDI PODATKE O PROFESORU
router.get("/urediProfesora/:id", function(req, res) {
	var profesor = new Profesor(req.body);

	Profesor.findOne({_id: req.params.id}).exec(function(err, profesor){
		if(err){
			console.log("Greška u uređivanju podataka o profesori");
		} else {
			res.render("podaciKolegij.ejs", {profesor: profesor});
		}
	});

});

router.post('/izmjenaProfesora/:id', function(req, res) {
	console.log("update is in process...");
	Profesor.findByIdAndUpdate(req.params.id, {
		$set :{ imeProfesora: req.body.imeProfesora, prezimeProfesora: req.body.prezimeProfesora, emailProfesora: req.body.emailProfesora, uredProfesora: req.body.uredProfesora } }, {new: true}, function (err, profesor){
			if (err){
				console.log(err);
				res.render('/urediProfesora', {profesor:req.body});
			}
			res.redirect("/podaciKolegij");
		});
});	


//UNOS ASISTENTA
router.post('/unosAsistenta', function(req, res) {
	const asistent = new Asistent({
			kolegij: req.kolegij.id,
			imeAsistenta: req.body.imeAsistenta,
			prezimeAsistenta: req.body.prezimeAsistenta,
			emailAsistenta: req.body.emailAsistenta,
			uredAsistenta: req.body.uredProfesora
		});
		asistent.save().then(data => {
			console.log("Uspješno unesen novi asistent");
		}).catch(error => {
			console.log("Asistent nije spremljen")
		})
	res.redirect('/podaciKolegij');
})

router.get('/unosAsistenta', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosAsistenta.html'));
});


//DOHVAĆANJE PODATAKA O ASISTENTU
router.get('/podaciKolegij', function(req, res) {
	Asistent.find({}).exec(function(err, asistenti){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('podaciKolegij.ejs', { "asistenti" : asistenti });
	});
});

//UREDI PODATKE O ASISTENTU
router.get('/urediAsistenta/:id', function(req, res) {
	var asistent = new Asistent(req.body);

	Asistent.findOne({_id: req.params.id}).exec(function(err, asistent){
		if(err){
			console.log("Greška u uređivanju podataka o asistentu");
		} else {
			res.render('urediAsistenta.ejs', {asistent: asistent});
		}
	});
});

//UNOS BODOVA
router.post('/unosBodova', function(req, res) {
	const bodovi = new Bodovi({
			//kolegij: req.kolegij.id,
			kolokvijBodovi: req.body.kolokvijBodovi,
			ostaloBodovi: req.body.ostaloBodovi

		});
		bodovi.save().then(data => {
			console.log("Uspješno uneseni bodovi");
		}).catch(error => {
			console.log("Bodovi nisu spremljeni")
		})
	res.redirect('/podaciKolegij');
})

router.get('/unosBodova', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosBodova.html'));
});

//UREDI BODOVE
router.get('/urediBodove/:id', function(req, res) {
	var bodovi = new Bodovi(req.body);

	Bodovi.findOne({_id: req.params.id}).exec(function(err, bodovi){
		if(err){
			console.log("Greška u uređivanju bodova");
		} else {
			res.render('urediBodove.ejs', {bodovi: bodovi});
		}
	});
});

//UNOS DOLAZNOSTI
router.post('/unosDolaznosti', function(req, res) {
	const dolaznost = new Dolaznost({
			//kolegij: req.kolegij.id,
			datum: req.body.datum
		});
		dolaznost.save().then(data => {
			console.log("Uspješno unesen datum u dolaznost");
		}).catch(error => {
			console.log("Datum nije spremljen")
		})
	res.redirect('/podaciKolegij');
})

router.get('/unosDolaznosti', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosDolaznosti.html'));
});

//UREDI DOLAZNOST
router.get('/urediDolaznost/:id', function(req, res) {
	var dolaznost = new Dolaznost(req.body);

	Dolaznost.findOne({_id: req.params.id}).exec(function(err, dolaznost){
		if(err){
			console.log("Greška u uređivanju datuma dolaznsoti");
		} else {
			res.render('urediDolaznost.ejs', {dolaznost: dolaznost});
		}
	});
});

//UNOS AKTIVNOSTI/ISPITA
router.post('/unosIspita', function(req, res) {
	const aktivnost = new Aktivnost({
			//kolegij: req.kolegij.id,
			tipAktivnosti: req.body.tipAktivnosti,
			nazivAktivnosti: req.body.nazivAktivnosti,
			datumAktivnosti: req.body.datum
		});
		aktivnost.save().then(data => {
			console.log("Uspješno unesena aktivnost");
		}).catch(error => {
			console.log("Aktivnost nije spremljena")
		})
	res.redirect('/podaciKolegij');
})

router.get('/unosIspita', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosIspita.html'));
});

//DOHVAĆANJE PODATAKA O AKTIVNOSTI
router.get('/podaciKolegij', function(req, res) {
	Aktivnost.find({}).exec(function(err, aktivnosti){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('podaciKolegij.ejs', { "aktivnosti" : aktivnosti });
	});
});

//UREDI AKTIVNOSTI/ISPITE
router.get('/urediIspite/:id', function(req, res) {
	var aktivnost = new Aktivnost(req.body);

	Aktivnost.findOne({_id: req.params.id}).exec(function(err, aktivnost){
		if(err){
			console.log("Greška u uređivanju aktivnosti");
		} else {
			res.render('urediIspite.ejs', {aktivnost: aktivnost});
		}
	});
});

//SESSIONS
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
 
