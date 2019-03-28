<?php
include_once '../../config/db.php';
$stmt = $conn->prepare("INSERT INTO finansijkiIzvestaj (datum,stanje, uplateRFZO, participacija, apotekaDom,prenosPlate,ostaleUplate,plate,jubilarne,otpremnine,povratPlate,bolovanje) 
    VALUES (:datum, :stanje, :uplateRFZO, :participacija, :apotekaDom, :prenosPlate, :ostaleUplate,:plate, :jubilarne, :otpremnine, :povratPlate, :bolovanje)");
	
	$stmt->bindParam(':datum', $datum);
    $stmt->bindParam(':stanje', $stanje);
    $stmt->bindParam(':uplateRFZO', $uplateRFZO);
	$stmt->bindParam(':participacija', $participacija);
	$stmt->bindParam(':apotekaDom', $apotekaDom);
	$stmt->bindParam(':prenosPlate', $prenosPlate);
	$stmt->bindParam(':ostaleUplate', $ostaleUplate);
	$stmt->bindParam(':plate', $plate);	
	$stmt->bindParam(':jubilarne', $jubilarne);
	$stmt->bindParam(':otpremnine', $otpremnine);
	$stmt->bindParam(':povratPlate', $povratPlate);
	$stmt->bindParam(':bolovanje', $bolovanje);
	      
	    $datum = $_POST['datum'];
		$stanje = $_POST['stanje'];
		$uplateRFZO = $_POST['uplateRFZO'];
		$participacija = $_POST['participacija'];
		$apotekaDom = $_POST['apotekaDom'];
		$prenosPlate = $_POST['prenosPlate'];
		$ostaleUplate= $_POST['ostaleUplate'];		
		$plate= $_POST['plate'];		
		$jubilarne= $_POST['jubilarne'];
		$otpremnine= $_POST['otpremnine'];		
		$povratPlate= $_POST['povratPlate'];		
		$bolovanje= $_POST['bolovanje'];
		
		try{
			$stmt->execute();
			echo "ok";
		}
		catch(PDOException $e)
		{
			echo "Error: " . $e->getMessage();
		}
		
	   
    
	
	