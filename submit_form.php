<html>
<body>

<?php
$servername = 'localhost';
$username = 'root';
$password = 'wit123';
$dbname = 'covid_declaration';

//connect to database server
$con = mysqli_connect($servername,$username,$password,$dbname);
//check for connection
if (!$con) {
	die('Connection failed: ' . mysqli_error($con));
}

//escape character security
$passport = mysqli_real_escape_string($con, $_REQUEST['passport']);
$nationality = mysqli_real_escape_string($con, $_REQUEST['nationality']);
$firstName = mysqli_real_escape_string($con, $_REQUEST['firstName']);
$middleName = mysqli_real_escape_string($con, $_REQUEST['middleName']);
$lastName = mysqli_real_escape_string($con, $_REQUEST['lastName']);
$DOB = mysqli_real_escape_string($con, $_REQUEST['birthday']);
$gender = mysqli_real_escape_string($con, $_REQUEST['gender']);
$street = mysqli_real_escape_string($con, $_REQUEST['st_address']);
$city = mysqli_real_escape_string($con, $_REQUEST['city']);
$state = mysqli_real_escape_string($con, $_REQUEST['state']);
$zipcode = mysqli_real_escape_string($con, $_REQUEST['zip']);
$email = mysqli_real_escape_string($con, $_REQUEST['email']);
$phone = mysqli_real_escape_string($con, $_REQUEST['phone']);
$mobile = mysqli_real_escape_string($con, $_REQUEST['mobile']);
//$date_inChina = mysqli_real_escape_string($con, $_REQUEST['']);
//$fever = mysqli_real_escape_string($con, $_REQUEST['']);
//$cough = mysqli_real_escape_string($con, $_REQUEST['']);
//$difficulityBreathing = mysqli_real_escape_string($con, $_REQUEST['']);

if ($mobile == "yes")
	$mobile = 1;
else
	$mobile = 0;


$sql="INSERT into passenger (passportNo,nationality,firstName,middleName,lastName,DOB,gender,street,city,state,zipcode,email,phone,mobile)
VALUES
('$passport','$nationality','$firstName','$middleName','$lastName','$DOB','$gender','$street','$city','$state','$zipcode','$email','$phone','$mobile')";

if (!mysqli_query($con,$sql)){
	die('Error: ' . mysqli_error($con));
}
echo "submission added";

mysqli_close($con)
?>

</body>
</html>