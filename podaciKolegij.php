<!DOCTYPE html>
<html lang="en">
<head>
  <title>Home</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/index.css" rel="stylesheet" type="text/css">
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
           <p style="color: darkgray;">Naziv kolegija</p>
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
    <div class="row">
        <div class="col-sm-12 col-12 d-flex justify-content-center" >
            <a class="btn btn-primary" href="unosPodatakaKolegiji.php" role="button" style="color: white;">Uredi podatke o kolegiju</a>
        </div>
        
    </div>
    <div class="row" style="margin-bottom: 1em;">
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card text-white bg-secondary mb-3">
                <div class="card-header"><h5>Kontakti</h5></div>
                <div class="card-body">
                    <p class="card-text"><b>Profesor:</b></p>
                    <p class="card-text">Prof. dr. sc. Ime Prezime</p>
                    <p class="card-text">E-mail: mail@gmail.com</p>
                    <p class="card-text">Ured: broj</p>
                    <p class="card-text"><b>Asistent:</b></p>
                    <p class="card-text">Prof. dr. sc. Ime Prezime</p>
                    <p class="card-text">E-mail: mail@gmail.com</p>
                    <p class="card-text">Ured: broj</p>
                </div>
              </div>
        </div>
        <div class="col-sm-6 col-12 d-flex justify-content-center" >
            <div class="card text-white bg-danger mb-3">
                <div class="card-header"><h5>Ispiti i ostale aktivnosti</h5></div>
                <div class="card-body">
                    <p class="card-text">dd.mm.gg - kolokvij</p>
                    <p class="card-text">dd.mm.gg - kolokvij</p>
                    <p class="card-text">dd.mm.gg - ostalo</p>
                </div>
              </div>
        </div>
        <div class="col-sm-4 col-12 d-flex justify-content-center" >
            <div class="card text-white bg-success mb-3">
                <div class="card-header"><h5>Broj ostvarenih bodova</h5></div>
                <div class="card-body">
                    <p class="card-text"><b>Kolokvij:</b> 40</p>
                    <p class="card-text"><b>Ostalo:</b> 20</p>
                    <p class="card-text"><b>Ukupno:</b> 60</p>
                </div>
              </div>
        </div>
        <div class="col-sm-4 col-12 d-flex justify-content-center" >
            <div class="card text-white bg-primary mb-3">
                <div class="card-header"><h5>Ispitni rokovi</h5></div>
                <div class="card-body">
                    <p class="card-text">dd.mm.gg - kolokvij</p>
                    <p class="card-text">dd.mm.gg - kolokvij</p>
                    <p class="card-text">dd.mm.gg - ostalo</p>
                </div>
              </div>
        </div>
        <div class="col-sm-5 col-12 d-flex justify-content-center" >
            <div class="card bg-light mb-3">
                <div class="card-header"><h5>Evidencija dolaznosti</h5></div>
                <div class="card-body">
                  <p class="card-text"><input type="checkbox" id="check" name="check"><label for="check"> dd.mm.gg. </label></p>
                  <hr>
                  <p class="card-text"><input type="checkbox" id="check" name="check"><label for="check"> dd.mm.gg.</label></p>
                  <hr>
                  <p class="card-text"><input type="checkbox" id="check" name="check"><label for="check"> dd.mm.gg.</label></p>
                  <hr>
                  <p class="card-text"><input type="checkbox" id="check" name="check"><label for="check"> dd.mm.gg.</label></p>
                </div>
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