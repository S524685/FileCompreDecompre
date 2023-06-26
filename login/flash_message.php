<!-- ERROR -->

<?php
    if(isset($_SESSION['errorMessage'])){
?>
    
    <div class="flash-message-error">
        <div class="error">
            <span><?php echo $_SESSION['errorMessage'] ?></span>
        </div>
    </div>

    <script>
        div = document.querySelector(".flash-message-error");
        div.classList.remove("hide");
        div.classList.add("show");
        setTimeout(function(){
            div.classList.add("hide");
            div.classList.remove("show");
        },3000);
    </script>
<?php
    unset($_SESSION['errorMessage']);
    }
?>


<!-- SUCCESS -->


<?php
    if(isset($_SESSION['successMessage'])){
?>
    
    <div class="flash-message-success hide">
        <div class="success">
            <span><?php echo $_SESSION['successMessage'] ?></span>
        </div>
    </div>

    <script>
        div = document.querySelector(".flash-message-success");
        div.classList.remove("hide");
        div.classList.add("show");
        setTimeout(function(){
            div.classList.add("hide");
            div.classList.remove("show");
        },3000);
    </script>
    
<?php
    unset($_SESSION['successMessage']);
    }
?>