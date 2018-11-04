<?php
//ALLOW CROSS-ORIGIN RESOURCE SHARING CORS

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE,PUT');

//-----------------------------

//ESTABLISH DB CONNECTION

$db_host = "localhost";
$db_username = "ahmed";
$db_password="pclock";
$db_name="test";

$db_connection=new MySQLi($db_host,$db_username,$db_password,$db_name);

if (!$db_connection)
{
	die("Connection Error" . mysqli_connect_err());
}

?>