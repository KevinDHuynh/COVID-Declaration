<?php
    $username = $_POST["username"];
    $password = $_POST["password"];

    if($username= "admin" && $password=="admin"){ 
        //direct to view data if username and password are correct
        header("Location: http://localhost/COVID-Declaration/view_data.php");
        die();
    }else{
        //direct to login page if username or password is incorrect
        header("Location: http://localhost/COVID-Declaration/login.html");
    }
?>