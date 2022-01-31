
  <?php
  $serverName ="localhost";
  $username="root";
  $password="";
  $cn=mysqli_connect($serverName,$username,$password);
  
  if(!$cn){
      echo "error";
  }
  else{
      echo "super";
  }
  
  $close=mysqli_close($cn);
  ?>
    