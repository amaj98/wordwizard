<?php

    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");

    if (!$dbhandle) die ($error);


    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $query = "SELECT rack FROM racks WHERE length=7 and weight <= 10 order by random() limit 1";
        $statement = $dbhandle->prepare($query);
        $statement->execute();
    
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($results);
        }

    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $test = json_decode($_POST);
        echo json_encode($_POST);
    }

?>