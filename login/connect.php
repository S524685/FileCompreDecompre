<?php
    $dbServername = "localhost";
    $dbUsername ="root";
    $dbPassword =""; 
    $dbName ="compressDecompress";

    // Creat e a connection
    $conn = mysqli_connect($dbServername ,$dbUsername,$dbPassword , $dbName);

    if(!$conn){
        die("SORRY FAILED TO CONNECT TO DATABASE:   " . mysqli_connect_error());
    }
    
?>