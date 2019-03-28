<?php
include_once '../../config/db.php';
	
$sql= "SELECT * FROM finansijkiIzvestaj WHERE datum = (SELECT MAX(datum) from finansijkiIzvestaj)"; 
$stmt = $conn->prepare($sql);

$stmt->execute();	
$obj = $stmt->fetchObject();

if($obj!=false){

    echo json_encode($obj);
            
}else{

    echo "false";
}


