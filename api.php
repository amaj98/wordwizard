<?php

    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");

    if (!$dbhandle) die ($error);

    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $query = "SELECT rack FROM racks WHERE length=7 and weight <= 10 order by random() limit 1";
        $statement = $dbhandle->prepare($query);
        $statement->execute();
    
        $results = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode($results);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $combos = json_decode($_POST["words"]);
        
        $words = array();
        
        foreach ($combos as $value) {
            $query = "SELECT words FROM racks WHERE rack = '$value'"
            $statement = $dbhandle->prepare($query);
            $statement->execute();
            $raw = $statement->fetch(PDO::FETCH_ASSOC);
            $words = array_merge($words,explode("@@",$raw));
        }

        echo json_encode($words);
    }

?>