<?php

if (isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    require_once 'connect.php';

    if ( empty($email) || empty($password) ){
        $_SESSION["errorMessage"] = "Empty input fields !";
        header("location: index.php");
        exit();
    }

    $sql = "SELECT * FROM register WHERE email = '$email';";
    $result = mysqli_query($conn , $sql) ;
    $num = mysqli_num_rows($result);
    
    if (!$num > 0){
        $_SESSION["errorMessage"] = "Email Not Found !";
        header("location: index.php");
        exit();
    }
   
    if( $num > 0){
        $row = mysqli_fetch_assoc($result);
    }

    $passwordHashed = $row["password"];
    $checkPassword = password_verify($password , $passwordHashed);

    if ($checkPassword === false){
        session_start();
        $_SESSION["errorMessage"] = "Incorrect Password !";
        header("location: index.php");
        exit();
    }
    else if ($checkPassword === true) {
        session_start();
        $_SESSION["id"] = $row["id"] ;
        $_SESSION["email"] = $row["email"] ;
        $_SESSION["name"] = $row["user_name"] ;
        
        $_SESSION["successMessage"] = "Logged In Successfully !";

        header("location: ../index.php");
        exit();
    }

} else {
    header("location: index.php");
    exit();
}