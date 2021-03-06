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

$stop_1 = mysqli_real_escape_string($con, $_REQUEST['stop_1']);
$stop_2 = mysqli_real_escape_string($con, $_REQUEST['stop_2']);
$stop_3 = mysqli_real_escape_string($con, $_REQUEST['stop_3']);

$flightNo_1 = mysqli_real_escape_string($con, $_REQUEST['flightNo_1']);
$seatNo_1 =  mysqli_real_escape_string($con, $_REQUEST['seatNo_1']);

$flightNo_2 = mysqli_real_escape_string($con, $_REQUEST['flightNo_2']);
$seatNo_2 =  mysqli_real_escape_string($con, $_REQUEST['seatNo_2']);

$flightNo_3 = mysqli_real_escape_string($con, $_REQUEST['flightNo_3']);
$seatNo_3 =  mysqli_real_escape_string($con, $_REQUEST['seatNo_3']);

$flightNo_4 = mysqli_real_escape_string($con, $_REQUEST['flightNo_4']);
$seatNo_4 =  mysqli_real_escape_string($con, $_REQUEST['seatNo_4']);

$fever = mysqli_real_escape_string($con, $_REQUEST['fever']);
$cough = mysqli_real_escape_string($con, $_REQUEST['cough']);
$shortBreath = mysqli_real_escape_string($con, $_REQUEST['shortBreath']);

//create SQL command to insert into passenger table
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

//send command and retreive last added ID for next command
if (mysqli_query($con, $sql)) {
    $passengerID = mysqli_insert_id($con);
}

//create sql command for insert to flight table
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
	
//send command and retreive last added ID for next command
if (mysqli_query($con, $sql)) {
    $flightID = mysqli_insert_id($con);
}


$sql_layover="";
$departure="";
$arrival="";
$airline="";
$flightNo="";
$seatNo="";

//create loop to add as many layovers as submited 
for ($i = 1; $i<= $stopNo; $i++){
	$j = $i+1;

	//create new variables using escape characters
	if($i == $stopNo){
	$departure=${"stop_".$i};
	$arrival=$destination;	
	$flightNo=${"flightNo_".$i};
	$seatNo=${"seatNo_".$i};
	}
	else{
	$departure=${"stop_".$i};
	$arrival=${"stop_".$j};
	$flightNo=${"flightNo_".$i};
	$seatNo=${"seatNo_".$i};
	}
	$sql_layover = "INSERT into layover (
		flightID,
		stopNo,
		origin,
		destination,
		flightNo,
		seatNo)
	VALUES(
		'$flightID',
		'$i',
		'$departure',
		'$arrival',
		'$flightNo',
		'$seatNo');";
		
	if (!mysqli_query($con,$sql_layover)){
	die('Error: ' . mysqli_error($con));
	}
}
mysqli_close($con);

//redirect user back to homepage
header("Location: index.html");
exit();
?>

</body>
</html>