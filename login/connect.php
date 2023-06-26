<?php
    $dbServername = "localhost";
    $dbUsername ="root";
    $dbPassword =""; 
    $dbName ="easyfood1";

    // Creat e a connection
    $conn = mysqli_connect($dbServername ,$dbUsername,$dbPassword , $dbName);

    if(!$conn){
        die("SORRY FAILED TO CONNECT TO DATABASE -easyfood1:   " . mysqli_connect_error());
    }
    
?>