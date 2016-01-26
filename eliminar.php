<?php
require('clases/cliente.class.php');

$cliente_id=$_GET['id'];
$objCliente=new Cliente;
if( $objCliente->eliminar($cliente_id) == true){
	echo "Registro eliminado correctamente";
}else{
	echo "Ocurrio un error";
}
?>