<?php

include_once '../../config/db.php';

	

$sql= "SELECT * FROM tip_utroska"; 

$stmt = $conn->prepare($sql);



$stmt->execute();	

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);



if($obj!=false){



    echo json_encode($obj);

            

}else{



    echo "false";

}





