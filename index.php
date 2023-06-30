<?php
  session_start();
  if(isset($_SESSION['id'])){
	  
  }
?>

<html>

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<title>Huffmann File Compressor</title>

	<!-- Stylesheets -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
	<link rel='stylesheet' href='styles.css'>

	<!-- Font Awesome -->
	<script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
	
</head>

<!-- <body onload="onloadfn();"> -->
<body>

<?php
  if(isset($_SESSION['id'])){
?>
	<div>
		hello, <?php echo $_SESSION['name']?>
		<a href="login/logout.php"><button>logout</button></a>
	</div> 	
<?php  
  }else{

?>
	<div>
		<a href="login/login.php"><button>login</button></a>
	</div>
<?php
  }
?>
	<div class=container-fluid>
		<h1 id="heading">Compress your text files using Huffmann Compression</h1>
		<div class="card" id="step1">
			<h2>Upload a Text File</h2><center>
			<i class="far fa-file-alt fa-5x"></i>
			<br>
			<input class="btn btn-outline-warning" type="file" id="uploadfile"><br>
			
			<input class="btn btn-outline-success" type="button" id="submitbtn" value="Submit"></center>
			
		
		
		</div>
		<div class="card" id="step2">
			<h2>Select Action</h2><center>
			<i class="far fa-file-archive fa-3x"></i>
			<br>
			<button type="button" id="encode" class="btn btn-primary" >Compress</button>
			<button type="button" id="decode" class="btn btn-primary" >De-Compress</button></center>
		</div>
		<div class="card" id="step3">
			<div id="downloadBtn" class="downloadButton">
				<a href="login/index.php">
					<button>Download</button>
				</a>
			</div>
		</div>
		<button id="startagain" class="btn btn-info btn-lg" type="button" onclick="location.reload()" >Click here to reload</button>
	</div>		

	<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
	<script src='script.js'></script>
</body>

</html>

