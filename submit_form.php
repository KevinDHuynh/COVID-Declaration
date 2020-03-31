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

$passport = mysqli_real_escape_string($con, $_REQUEST['passport']);


$sql="INSERT into passenger (passportNo)
VALUES
('$passport')";

if (!mysqli_query($con,$sql)){
	die('Error: ' . mysqli_error($con));
}
echo "submission added";

mysqli_close($con)
?>

</body>
</html>