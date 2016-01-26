<?php
require('functions.php');
$mes=$_GET['month'];
$anio=$_GET['year'];
$dia=1; //primer dia del mes
calendar($mes,$anio);
?>

