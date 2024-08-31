<?php
  session_start();
  if(isset($_SESSION['id'])){
	  
  }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profile Settings</title>
    <link rel="stylesheet" type="text/css" href="css/profile.css">
    <link rel='stylesheet' href='css/stylesprev.css'>
    <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet">


</head>
<body>
    <div class="wrapper">
        <div class="header">
        <a href="index.php"><i class='bx bx-arrow-back hello1'></i></a>

            <h1>Profile Settings</h1>
        </div>
        <div class="content">
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" value ="<?php echo $_SESSION['name']?>">

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email">

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password">

                
                <input type="submit" value="Update">
                
                <a href="login/login.php"><input type="submit" value="logout"></a>
                
            </form>
        </div>
        
    </div>
</body>
</html>
