<?php 
$target = 'profiles/'.$_POST["id"].".jpg";
	//$ext = ".".pathinfo($_FILES['imagen']['name'])['extension'];
if (isset($_FILES['imagen'])) {
	move_uploaded_file($_FILES['imagen']['tmp_name'], $target);
} else {
	if (file_exists($target)) {
		echo $target.'?m='.filemtime($target);
	} else {
		echo 'profiles/no-photo.jpg';
	}
	
}
?>
