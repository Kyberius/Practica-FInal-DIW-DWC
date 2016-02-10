<?php 
	//$ext = ".".pathinfo($_FILES['imagen']['name'])['extension'];
	$target = 'profiles/'.$_POST["id"].".jpg";
	move_uploaded_file($_FILES['imagen']['tmp_name'], $target);
 ?>