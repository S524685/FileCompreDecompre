<?php
  session_start();
  if(isset($_SESSION['id'])){
    header("location: ../index.php");
    exit(); 
  }
  else{
?>

  <html>
      <head>
        <title>Easy Food</title>	
        <link rel="stylesheet" href="style.css">
        <link rel="register.php">
        <link rel="stylesheet" href="flash_message.css">

        <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&display=swap" rel="stylesheet">
      </head>
      <body>

        <div class="cont">
          <div class="form sign-in">
          <h2>Sign In</h2>
            <form action="login.php" method="post">
              <label>
                <span>Email</span>
                <input type="email" name="email">
              </label>
              <label>
                <span>Password</span>
                <input type="password" id="passwordInput" name="password">
              </label>
              <button class="submit" name ="submit" type="submit">Sign In</button>
            </form>
            <p class="forgot-pass">Forgot Password ?</p>
          </div>
      
          <div class="sub-cont">
            <div class="img">
              <div class="img-text m-up">
                <h2>New here?</h2>
              </div>
              <div class="img-text m-in">
                <h2>One of us?</h2>
                <p>If you already has an account, just sign in.</p>
              </div>
              <div class="img-btn">
                <span class="m-up">Register</span>
                <span class="m-in">Sign In</span>
              </div>
            </div>
      
      
      
      
            <!-- register -->
            <?php
            include_once 'flash_message.php';
            ?>
      
            <div class="form sign-up">
              <h2>Register</h2>
              <form action="register.php" method="post">
                <label>
                  <span>Username</span>
                  <input type="text" name="name" required>
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required>
                </label>
                <label>
                  <span>Password</span>
                  <input type="password" name="password1" required>
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input type="password" name="password2" required>
                </label>
                <button type="submit" name="submit" class="submit">Register Now</button>
              </form>
            </div>
          </div>
        </div>
        <script type="text/javascript" src="script.js"></script>
      </body>
      </html>
  
<?php
  }
?>
