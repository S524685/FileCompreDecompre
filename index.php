<?php
session_start();
if (isset($_SESSION['id'])) {
}
?>

<html>

<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Encrycomp</title>

    <!-- Stylesheets -->
    <link rel='stylesheet' href='css/stylesprev.css'>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet">


    <!-- Font Awesome -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>

    <!-- Crypto Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

</head>

<!-- <body onload="onloadfn();"> -->
<body>

    <header>
        <!-- Navigation -->
        <div class="nav container">
            <div class="hello">
                Hello, <?php echo isset($_SESSION['name']) ? $_SESSION['name'] : 'Guest'; ?>
            </div>
            <li class="profile-icon"><i class="bx bx-user-circle hello"></i>
                <div class="dropdown">
                    <ul>
                        <a href="profile.php"><button class="title">Profile</button></a>
                        <?php if (isset($_SESSION['id'])) { ?>
                            <div>
                                <a href="login/logout.php"><button class="title">Logout</button></a>
                            </div>
                        <?php } else { ?>
                            <div>
                                <a href="login/login.php"><button class="title">Login</button></a>
                            </div>
                        <?php } ?>
                    </ul>
                </div>
            </li>
        </div>
    </header>

    <div class="container-fluid">
        <h1 id="heading">Use our services here </h1>
        <div class="card" id="step1">
            <h2>Upload a Text File</h2>
            <center>
                <i class="far fa-file-alt fa-5x"></i>
                <br>
                <input class="btn btn-outline-warning" type="file" id="uploadfile"><br>
                <input class="btn btn-outline-success" type="button" id="submitbtn" value="Submit">
            </center>
        </div>
        <div class="card" id="step2">
            <h2>Select Service</h2>
            <center>
                <i class="far fa-file-archive fa-3x"></i>
                <br>
                <?php if (isset($_SESSION['id'])) { ?>
                    <!-- Updated button IDs to match the JavaScript code -->
                    <button type="button" id="encode" class="btn btn-primary">Compress</button>
                    <button type="button" id="decode" class="btn btn-primary">Decompress</button>
                    <button type="button" id="encrypt" class="btn btn-primary">Encrypt</button>
                    <button type="button" id="decrypt" class="btn btn-primary">Decrypt</button>
                    <button type="button" id="compressEncrypt" class="btn btn-primary">Compress + Encrypt</button>
					<button type="button" id="decryptDecompress" class="btn btn-primary">Decrypt + Decompress</button>
                <?php } else { ?>
                    <a href="login/login.php">
                        <button type="button" class="btn btn-primary">Login to Access Services</button>
                    </a>
                <?php } ?>
            </center>
        </div>
        <div class="card" id="step3">
            <div id="downloadBtn" class="downloadButton">
                <a href="login/index.php">
                    <button>Download</button>
                </a>
            </div>
        </div>
        <button id="startagain" class="btn btn-info btn-lg" type="button" onclick="location.reload()">Click here to
            reload</button>
    </div>

    <!-- Crypto Library -->
	<script src='js/script.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous">
    </script>
    

</body>

</html>

