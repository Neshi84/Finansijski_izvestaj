<?php
include_once '../../config/db.php';
	
$sql= "SELECT * FROM finansijkiIzvestaj WHERE datum = :datum"; 
$stmt = $conn->prepare($sql);
$stmt->bindParam(':datum', $datum);

if(isset($_POST['datum'])){

    $datum = $_POST['datum'];
    $stmt->execute();	
    $obj = $stmt->fetchObject();

        if($obj!=false){

            echo json_encode($obj);
            
        }else{

            echo "false";
        }

} 
