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
$fever = mysqli_real_escape_string($con, $_REQUEST['fever']);
$cough = mysqli_real_escape_string($con, $_REQUEST['cough']);
$shortBreath = mysqli_real_escape_string($con, $_REQUEST['shortBreath']);
$passport = mysqli_real_escape_string($con, $_REQUEST['passport']);
$nationality = mysqli_real_escape_string($con, $_REQUEST['nationality']);
$firstName = mysqli_real_escape_string($con, $_REQUEST['first_name']);
$middleName = mysqli_real_escape_string($con, $_REQUEST['middle_name']);
$lastName = mysqli_real_escape_string($con, $_REQUEST['last_name']);
$DOB = mysqli_real_escape_string($con, $_REQUEST['dob_date']);
$gender = mysqli_real_escape_string($con, $_REQUEST['gender']);
$street = mysqli_real_escape_string($con, $_REQUEST['address']);
$city = mysqli_real_escape_string($con, $_REQUEST['city']);
$state = mysqli_real_escape_string($con, $_REQUEST['state']);
$zipcode = mysqli_real_escape_string($con, $_REQUEST['zipcode']);
$email = mysqli_real_escape_string($con, $_REQUEST['email']);
$phone = mysqli_real_escape_string($con, $_REQUEST['phone_number']);
$inChina = mysqli_real_escape_string($con, $_REQUEST['inChina']);
$date_inChina = mysqli_real_escape_string($con, $_REQUEST['date_China']);
$inRegion = mysqli_real_escape_string($con, $_REQUEST['inRegions']);
$recent_countries = mysqli_real_escape_string($con, $_REQUEST['recent_countries']);
$origin = mysqli_real_escape_string($con, $_REQUEST['origin']);
$destination = mysqli_real_escape_string($con, $_REQUEST['dest']);
$stopNo = mysqli_real_escape_string($con, $_REQUEST['stop_number']);

$sql="INSERT into passenger (
	passportNo,
	nationality,
	firstName,
	middleName,
	lastName,
	DOB,
	gender,
	street,
	city,
	state,
	zipcode,
	email,
	phone,
	inChina,
	date_inChina,
	fever,
	cough,
	difficultyBreathing,
	inRegions,
	recentCountries)
VALUES (
	'$passport',
	'$nationality',
	'$firstName',
	NULLIF('$middleName',''),
	'$lastName',
	NULLIF('$DOB',''),
	'$gender',
	NULLIF('$street',''),
	'$city',
	'$state',
	'$zipcode',
	'$email',
	'$phone',
	'$inChina',
	NULLIF('$date_inChina',''),
	'$fever',
	'$cough',
	'$shortBreath',
	'$inRegion',
	NULLIF('$recent_countries',''));";
	
if (mysqli_query($con, $sql)) {
    $passengerID = mysqli_insert_id($con);
}
$sql="INSERT into flight (
	origin,
	destination,
	stopNo,
	passengerID)
VALUES (
	'$origin',
	'$destination',
	'$stopNo',
	'$passengerID')";
	
if (!mysqli_query($con,$sql)){
	die('Error: ' . mysqli_error($con));
}
echo "submission added";
//Go back to Home page
//header("index.html")
mysqli_close($con)

?>

</body>
</html>