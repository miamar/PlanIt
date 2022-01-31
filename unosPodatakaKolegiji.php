<!DOCTYPE html>
<html lang="en">
<head>
  <title>Home</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/index.css" rel="stylesheet" type="text/css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

    <div class="nav flex-column nav-pills sticky-top" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link" id="v-pills-planit-tab" data-toggle="pill" href="index.php" role="tab" aria-controls="v-pills-planit" aria-selected="false" style="color: black;"><b>PlanIt</b></a>
        <hr style="width: 80%; align-self: center;">
        <a class="nav-link" id="v-pills-planner-tab" data-toggle="pill" href="index.php" role="tab" aria-controls="v-pills-planner" aria-selected="false">Moj planner</a>
        <hr style="width: 80%; align-self: center;">
        <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="mojprofil.php" role="tab" aria-controls="v-pills-profile" aria-selected="false">Moj profil</a>
        <hr style="width: 80%; align-self: center;">
        <a class="nav-link" id="v-pills-raspored-tab" data-toggle="pill" href="raspored.php" role="tab" aria-controls="v-pills-raspored" aria-selected="false">Raspored sati</a>
        <hr style="width: 80%; align-self: center;">
        <a class="nav-link active" id="v-pills-kolegiji-tab" data-toggle="pill" href="kolegiji.php" role="tab" aria-controls="v-pills-kolegiji" aria-selected="True"  style="background-color: #d9534f; color:white">Kolegiji</a>
        <hr style="width: 80%; align-self: center;">
        <a class="nav-link" id="v-pills-obavijesti-tab" data-toggle="pill" href="obavijesti.php" role="tab" aria-controls="v-pills-obavijesti" aria-selected="false">Obavijesti</a>
        <hr style="width: 80%; align-self: center;">
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-6" style="margin-top: 1em;">
           <p style="color: darkgray;">Unos podataka o kolegiju</p>
        </div>
        <div class="col-6" style="margin-top: 1em;">
            <div class="dropdown" style="float:right;">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    <img src="person.svg" style="width: 70%;">
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Moj profil</a></li>
                  <li><a class="dropdown-item" href="prijava.php">Odjava</a></li>
                </ul>
              </div>
         </div>
    </div>
    <div class="row">
        <div class="col-12" style="margin-top: 1em;">
          <div class="dropdown">
            <a href="kolegiji.php"><button type="button" class="btn btn-secondary ">
              Kolegiji
          </button></a>
          </div>
         </div>
      </div>


    <div class="row justify-content-center" style="margin-top: 1em; margin-bottom: 1em;">
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Kontakt (profesor)</h5></div>
                <div class="card-body">
                  <form>
                    <p class="card-text"><b>Profesor:</b></p>
                    <div class="form-group">
                        <label class="from-control">Ime</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group">
                        <label class="from-control">Prezime</label>
                        <input type="text" class="form-control" id="surname">
                      </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">E-mail</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Ured</label>
                  <input type="password" class="form-control" id="office">
                </div>
                <br>
		            <a class="btn btn-primary" href="podaciKolegij.php" role="button" type="submit">Izmijeni</a>
                    <a class="btn btn-danger" href="podaciKolegij.php" role="button">Odustani</a>
              </form>
                </div>
              </div>
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Kontakt (asistent)</h5></div>
                <div class="card-body">
                  <form>
                    <p class="card-text"><b>Asistent:</b></p>
                    <div class="form-group">
                        <label class="from-control">Ime</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group">
                        <label class="from-control">Prezime</label>
                        <input type="text" class="form-control" id="surname">
                      </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">E-mail</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Ured</label>
                  <input type="password" class="form-control" id="office">
                </div>
                <br>
		            <a class="btn btn-primary" href="podaciKolegij.php" role="button" type="submit">Izmijeni</a>
                    <a class="btn btn-danger" href="podaciKolegij.php" role="button">Odustani</a>
              </form>
                </div>
              </div>
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Ispiti i ostale aktivnosti</h5></div>
                <div class="card-body">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Odaberi kategoriju</option>
                        <option value="1">Kolokvij</option>
                        <option value="2">Završni ispit</option>
                        <option value="3">Zadaća</option>
                        <option value="4">Ostalo</option>
                      </select>
                  <form>
                    <div class="form-group">
                        <label class="from-control">Naziv aktivnosti:</label>
                        <input type="text" class="form-control" id="nazivIspita">
                    </div>
                    <div class="form-group">
                        <p class="card-text">Datum:</p>
                    </div>
                    <br>
		            <a class="btn btn-primary" href="podaciKolegij.php" role="button" type="submit">Izmijeni</a>
                    <a class="btn btn-danger" href="podaciKolegij.php" role="button">Odustani</a>
              </form>
                </div>
              </div>
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Ostvareni bodovi</h5></div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                        <label class="from-control">Kolokviji</label>
                        <input type="number" class="form-control" id="bodoviKolokvij">
                    </div>
                    <div class="form-group">
                        <label class="from-control">Ostalo</label>
                        <input type="number" class="form-control" id="bodoviOstalo">
                    </div>
                    <div class="form-group">
                        <label class="from-control">Ukupno</label>
                        <input type="number" class="form-control" id="bodoviUkupno">
                    </div>
                    <br>
		            <a class="btn btn-primary" href="podaciKolegij.php" role="button" type="submit">Izmijeni</a>
                    <a class="btn btn-danger" href="podaciKolegij.php" role="button">Odustani</a>
              </form>
                </div>
              </div>
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Evidencija dolaznosti</h5></div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                        <label class="from-control">Datum predavanja/vježbi</label>
                    </div>
                    <br>
                    <a class="btn btn-primary" href="podaciKolegij.php" role="button" type="submit">Izmijeni</a>
                    <a class="btn btn-danger" href="kolegiji.php" role="button">Odustani</a>
              </form>
                </div>
              </div>
              
        </div>
      
    </div>

    <div class="footer">
      <p style="margin-top: 1em;"><a href="index.php"><button type="button" class="btn" ><img src="home-fill.svg" style="width: 1em;"></button></a>
        <a href="mojprofil.php"><button type="button" class="btn"><img src="person.svg" style="width: 1em;" ></button></a>
        <a href="raspored.php"><button type="button" class="btn"><img src="calendar.svg" style="width: 1em;" ></button></a>
        <a href="kolegiji.php"><button type="button" class="btn bg-danger"><img src="book.svg" style="width: 1em;" ></button></a>
        <a href="obavijesti.php"><button type="button" class="btn"><img src="bell.svg" style="width: 1em;" ></button></a>
      </p>
    </div>
</body>
</html>