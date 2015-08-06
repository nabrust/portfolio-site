<?php 
	
	$name = $_POST["name_by_project"];
	$data = array();

	if ($name === '') {
		$data["status"] = "error";
		$data["text"] = "Заполните имя";
	} else {
		$data["status"] = "ok";
		$data["text"] = "Успешно заполнили имя";
	}
	
	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
		
 ?>