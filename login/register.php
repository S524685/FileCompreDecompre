
<?php
    session_start();
?>

<?php

if (isset($_POST["submit"])){

    $user_name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password1"];
    $confirmPassword = $_POST["password2"];

    require_once 'connect.php';
    $sql = "SELECT * FROM register WHERE email = '$email';";
    $result = mysqli_query($conn , $sql) ;
    $num = mysqli_num_rows($result);


    if (empty($user_name) || empty($email) || empty($password) || empty($confirmPassword) ){
        $_SESSION["errorMessage"] = "Empty input fields !";
        header("location: index.php");
        exit();
    }

    if( $num > 0){
        $_SESSION["errorMessage"] = "Email Already Existed !";
        header("location: index.php");
        exit();
    }

    if ($password !== $confirmPassword) {
        $_SESSION["errorMessage"] = "Passwords do not match !";
        header("location: index.php");
        exit();
    }

    $hashedPassword = password_hash($password , PASSWORD_DEFAULT );
    $sql_ins = "INSERT INTO register (user_name, email, password) VALUES ('$user_name' ,'$email' , '$hashedPassword');";
    $result1 = mysqli_query($conn , $sql_ins);
    header("location: index.php");
    exit();
    
}
?>