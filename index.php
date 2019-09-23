<?php 
include_once("index.html");

$dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
if (!$dbhandle) die ($error);

$query = "SELECT rack,words FROM racks WHERE length=7 and weight <= 10 order by random() limit 0, 1";

$statement = $dbhandle->prepare($query);

$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

echo $_POST;

?>