var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
var fs = require('fs');
const passport = require('passport');
const multer = require('multer')

const User = require('./models/User.js');
const ToDo = require('./models/ToDo.js');
const Kolegij = require('./models/Kolegij.js');
const Profesor = require('./models/Profesor.js');
const Asistent = require('./models/Asistent.js');
const Bodovi = require('./models/Bodovi.js');
const Dolaznost = require('./models/Dolaznost.js');
const Aktivnost = require('./models/Aktivnost.js');
const PodaciKolegij = require('./models/PodaciKolegij.js');
const Predavanje = require('./models/Predavanje.js');

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
app.get("/index", function (req, res) {
	ToDo.find({/*user: req.user.id*/}).exec(function(err, newListItem){
		   if(err) throw(err);
		  res.render("index", { newListItem});
	});
});

app.post("/list", function (req, res) {
  i = req.body.n;
  const item = new ToDo({
	  textToDo: i,
	  //user : req.user.id
  });
  item.save();
  res.redirect("/index");
});

//Kada se klikne na checkbox bilješka automatski se briše iz baze
app.post("/deleteItem", function(req,res){
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

const { response } = require('express');
const { readSync } = require('fs');
app.set('view engine', 'ejs');

// STVARANJE NOVOG RASPOREDA ZA 10 h
router.post('/unos', function(req, res) {
	const raspored = new Predavanje({
		imeKolegija: req.body.kolegij,
		dvoranaPredavanje: req.body.predavanje
		});
		raspored.save().then(data => {
			console.log("Uspješno kreiran novi raspored za 10 h!");
		}).catch(error => {
			console.log("Error")
		})
	res.redirect('/prikazRasporeda');
})

//PRIKZ NAPRAVLJENOG RASPOREDA ZA 10 h
router.get('/prikazRasporeda', function(req, res) {
	Predavanje.find({/*user: req.user.id*/}).exec(function(err, raspored){
		if (err) throw err;
		//console.log(req.user.id);
		res.render('prikazRasporeda.ejs', { "raspored" : raspored });
	});
});

//spremanje slika
const storage = multer.diskStorage({
	//putanja za spremanje slika
	destination:function(request, file, callback){
		callback(null, './public/uploads/images');
	},
    filename:function(request, file, callback){
		callback(null, Date.now() + file.originalname);
	}
});

//upload paramteri, multer
const upload = multer({
	storage:storage
})

//DOHVAĆANJE PODATAKA O KORISNIKU
router.get('/mojProfil', function(req, res) {
	User.find({_id: req.user.id}).exec(function(err, podaci){
		if (err) throw err;
		console.log(req.user.id);
		res.render('mojProfil.ejs', { "podaci" : podaci });
	});
});

//UREĐIVANJE PODATAKA O KORISNIKU
router.get('/urediProfil/:id', function(req, res) {
	var korisnik = new User(req.body);
	
	User.findOne({_id: req.params.id}).exec(function(err, korisnik){
		if(err){
			console.log("Error with editing user");
		} else {
			res.render('urediProfil.ejs', {korisnik: korisnik});
		}
	});
});

router.post('/urediPodatkeKorisnika/:id', function(req, res) {
	console.log("update user is in process...");
	User.findByIdAndUpdate(req.params.id, {
		$set :{ name : request.body.name,
			surname : request.body.surname,
		   userName : request.body.userName,
		   password : request.body.password,
		   email : request.body.email } }, {new: true}, function (err, korisnik){
			if (err){
				console.log(err);
				res.render('/urediProfil', {user:req.body});
			}
			res.redirect("/mojProfil.ejs");
		});
});

// STVARANJE NOVOG KOLEGIJA
router.post('/unosKolegija', upload.single('image'), function(req, res) {
	const kolegij = new Kolegij({
			user : req.user.id,
			nazivKolegija : req.body.nazivKolegija,
			dvoranaPredavanje : req.body.dvoranaPredavanje,
			dvoranaVjezbe : req.body.dvoranaVjezbe,
			modelNastave : req.body.modelNastave,
			img: req.file.filename,
			imeProfesora: req.body.imeProfesora,
		    prezimeProfesora: req.body.prezimeProfesora,
		    emailProfesora: req.body.emailProfesora,
		    uredProfesora: req.body.uredProfesora,
		    imeAsistenta: req.body.imeAsistenta,
		    prezimeAsistenta: req.body.prezimeAsistenta,
		    emailAsistenta: req.body.emailAsistenta,
		    uredAsistenta: req.body.uredProfesora,
		    kolokvijBodovi: req.body.kolokvijBodovi,
		    ostaloBodovi: req.body.ostaloBodovi
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
		console.log(req.user.id);
		res.render('kolegiji.ejs', { "kolegiji" : kolegiji });
	});
});

//BRISANJE KOLEGIJA
router.get('/brisanjeKolegija', function(req, res) {
	Kolegij.find({user: req.user.id}).exec(function(err, kolegiji){
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

//DOHVAĆANJE PODATAKA O KOLEGIJU KAD IMA ID OD TOG KOLEGIJA
router.get('/podaciKolegij/:id', function(req, res) {
	Kolegij.find({_id: req.params.id}).exec(function(err, kolegiji){
		if(err){
			console.log("Error with ffinding data");
		} else {
			res.render('podaciKolegij.ejs', {"kolegiji": kolegiji });
		}
	});
});

//UREĐIVANJE PODATAKA O KOLEGIJU
router.get('/urediPodatkeKolegija/:id', function(req, res) {
	var kolegij= new Kolegij(req.body);
	
	Kolegij.findOne({_id: req.params.id}).exec(function(err, kolegij){
		if(err){
			console.log("Error with editing data");
		} else {
			res.render('urediPodatkeKolegija.ejs', {kolegij: kolegij});
		}
	});
});

router.post('/urediPodatke/:id', function(req, res) {
	console.log("updating in process...");
	Kolegij.findByIdAndUpdate(req.params.id, {
		$set :{ dvoranaPredavanje : req.body.dvoranaPredavanje, 
			dvoranaVjezbe : req.body.dvoranaVjezbe,
			modelNastave : req.body.modelNastave,
			img: req.file.filename,
			imeProfesora: req.body.imeProfesora,
		    prezimeProfesora: req.body.prezimeProfesora,
		    emailProfesora: req.body.emailProfesora,
		    uredProfesora: req.body.uredProfesora,
		    imeAsistenta: req.body.imeAsistenta,
		    prezimeAsistenta: req.body.prezimeAsistenta,
		    emailAsistenta: req.body.emailAsistenta,
		    uredAsistenta: req.body.uredProfesora,
		    kolokvijBodovi: req.body.kolokvijBodovi,
		    ostaloBodovi: req.body.ostaloBodovi } }, 
			{new: true}, 
		    function (err, kolegij){
			if (err){
				console.log(err);
				res.render('/urediPodatkeKolegija', {kolegij:req.body});
			}
			res.redirect("/podaciKolegij");
		});
});

//DOHVAĆANJE DOLAZNOSTI
router.get('/dolaznost', function(req, res) {
	Dolaznost.find({}).exec(function(err, dolaznosti){
		if (err) throw err;
		res.render('dolaznost.ejs', { "dolaznosti" : dolaznosti});
	});
});

router.get('/unosDolaznosti', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosDolaznosti.html'));
});

//UNOS DOLAZNOSTI
router.post('/unosDolaznosti', function(req, res) {
	const dolaznost = new Dolaznost({
			kolegij: req.params.id,
			datum: req.body.datum
		});
		dolaznost.save().then(data => {
			console.log("Uspješno unesen datum u dolaznost");
		}).catch(error => {
			console.log("Datum nije spremljen")
		})
	res.redirect('/dolaznost');
})

//BRISANJE DOLAZNOSTI
router.get("/obrisiDolaznost/:id", (req,res,next)=>{
	var dolaznost = new Dolaznost(req.body);
    Dolaznost.findByIdAndRemove(req.params.id ,{useFindAndModify : false}, (err, dolaznost)=> {
       if(err) console.log(err)
       console.log("IZBRISANA AKTIVNOST: ", dolaznost);
    })
  res.redirect('/dolaznost');
})

//DOHVAĆANJE AKTIVNOSTI I ISPITA
router.get('/aktivnosti', function(req, res) {
	Aktivnost.find({}).exec(function(err, aktivnosti){
		if (err) throw err;
		res.render('aktivnosti.ejs', { "aktivnosti" : aktivnosti});
    });
});

router.get('/unosIspita', function(req, res){
	res.sendFile(path.join(__dirname + '/views' + '/unosIspita.html'));
	
});

//UNOS AKTIVNOSTI/ISPITA
router.post('/unosIspita', function(req, res) {
	const aktivnost = new Aktivnost({
			tipAktivnosti: req.body.tipAktivnosti,
			nazivAktivnosti: req.body.nazivAktivnosti,
			datumAktivnosti: req.body.datum
		});
		aktivnost.save().then(data => {
			console.log("Uspješno unesena aktivnost");
		}).catch(error => {
			console.log("Aktivnost nije spremljena")
		})
	res.redirect('/aktivnosti');
})

//BRISANJE AKTIVNOSTI/ISPITA
router.get("/obrisiAktivnost/:id", (req,res,next)=>{
	var aktivnost = new Aktivnost(req.body);
    Aktivnost.findByIdAndRemove(req.params.id ,{useFindAndModify : false}, (err, aktivnost)=> {
       if(err) console.log(err)
       console.log("IZBRISANA AKTIVNOST: ", aktivnost);
    })
  res.redirect('/aktivnosti');
})

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
 
