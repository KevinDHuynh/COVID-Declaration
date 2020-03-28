<?php
$servername = "localhost";
$username = "root";
$password = "wit123";
$dbname = "covid-declaration";

//connect to database server
$con = mysql_connect($servername,$username,$password);
//check for connection
if (!$con) {
	die('Connection failed: ' . mysql_error());
}
//select database
mysql_select_db($dbname,$con);

$sql="INSERT into passenger (passportNo, nationality, firstName, middleName, lastName, DOB, street, city, state, zipcode, email, phone, phone, mobile, fever, cough, difficultyBreathing)
VALUES
('$_POST[passenger]','$_POST[nationality]','$_POST[firstName]','$_POST[middleName]','$_POST[lastName]','$_POST[birthday]','$_POST[gender]','$_POST[st_address]','$_POST[city]','$_POST[state]','$_POST[selected]','$_POST[zip]','$_POST[email]','$_POST[phone number]','$_POST[mobile]')";

if (!mysql_query($sql,$con)){
	die('Error: ' . mysql_error());
}
echo "submission added";

mysql_close($con)

?>