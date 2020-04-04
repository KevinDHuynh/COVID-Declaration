<html>
<body>

<?php
$servername = 'localhost';
$username = 'root';
$password = 'wit123';
$dbname = 'covid_declaration';

//connect to database server$cough = mysqli_real_escape_string($con, $_REQUEST['r_cough']);
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
//$mobile = mysqli_real_escape_string($con, $_REQUEST['mobile']);
//$inChina = mysqli_real_escape_string($con, $_REQUEST['inChina']);
//$date_inChina = mysqli_real_escape_string($con, $_REQUEST['dateChina']);
//$fever = mysqli_real_escape_string($con, $_REQUEST['r_fever']);
//$cough = mysqli_real_escape_string($con, $_REQUEST['r_cough']);
//$difficulityBreathing = mysqli_real_escape_string($con, $_REQUEST['r_breath']);
$origin = mysqli_real_escape_string($con, $_REQUEST['origin']);
$destination = mysqli_real_escape_string($con, $_REQUEST['dest']);
$stopNo = mysqli_real_escape_string($con, $_REQUEST['stop_number']);

$sql="INSERT into passenger (
	passportNo,
	nationality,
	firstName,
	middleName,
	lastName,
	DOB,gender,
	street,
	city,
	state,
	zipcode,
	email,
	phone,
--	mobile,
--	inChina,
--	date_inChina,
--	fever,
--	cough,
--	difficulityBreathing)
VALUES (
	'$passport',
	'$nationality',
	'$firstName',
	'$middleName',
	'$lastName',
	'$DOB',
	'$gender',
	'$street',
	'$city',
	'$state',
	'$zipcode',
	'$email',
	'$phone',
--	'mobile',
--	'inChina',
--	'fever',
--	'cough',
--	'difficulityBreathing'
	);
	
INSERT into flight (
	origin,
	destination,
	stopNo)
VALUES (
	'$origin',
	'$destination',
	'$stopNo');
	
SET @flight = LAST_INSERT_ID();

CREATE procedure add_stop()
wholeblock:BEGIN
	DECLARE x INT;
	SET x = 1;
	
	loop_add: LOOP
		IF x > $stopNo THEN
			LEAVE loop_add;
		END IF;
		INSERT into layover (
			flightID,
			stopNo,
			origin,
			destination,
			flightNo,
			seatNo)
		VALUES (
			'@flight',
			x,
			-- concat('departure_1',x),
			-- concat('arrival_1',x),
			-- concat('flightNo_1',x),
			-- concat('seatNo_1',x);
			
		SET x = x + 1;
		ITERATE loop_add;
	END LOOP;
	";

if (!mysqli_query($con,$sql)){
	die('Error: ' . mysqli_error($con));
}
echo "submission added";

mysqli_close($con)
?>

</body>
</html>