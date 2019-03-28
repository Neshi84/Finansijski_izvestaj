<?php
include_once '../../config/db.php';
$stmt = $conn->prepare("INSERT INTO placanja (dobavljac, iznos, datum, tip_utroska) 
    VALUES (:dobavljac, :iznos, :datum, :tip_utroska)");
	
	$stmt->bindParam(':dobavljac', $dobavljac);
    $stmt->bindParam(':iznos', $iznos);
	$stmt->bindParam(':datum', $datum);
	$stmt->bindParam(':tip_utroska', $tip_utroska);
	

       
	    $dobavljac = $_POST['Dobavljac'];
		$iznos = $_POST['Iznos'];
		$datum = $_POST['Datum'];
		$tip_utroska = $_POST['Tip_utroska'];
		
		
		try{
			$stmt->execute();
			echo "ok";
		}
		catch(PDOException $e)
		{
			echo "Error: " . $e->getMessage();
		}
		
	   
    
	
	