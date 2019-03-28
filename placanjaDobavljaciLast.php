<?php

include_once '../../config/db.php';

	

$sql= "SELECT placanja.dobavljac,placanja.iznos,placanja.datum,tip_utroska.tip FROM placanja INNER JOIN tip_utroska ON placanja.tip_utroska = tip_utroska.id WHERE placanja.datum = (SELECT MAX(datum) from placanja) "; 

$stmt = $conn->prepare($sql);



$stmt->execute();	

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);



if($obj!=false){



    echo json_encode($obj);

            

}else{



    echo "false";

}





