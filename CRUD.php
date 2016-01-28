<?php
namespace dao\empresaDatabase;
include("clases/dao/empresaDatabase/autoload.php");
include("Parm/vendor/autoload.php");
use \Parm\Config;
Config::setupConnection("empresa","empresa","root","","localhost");
$type = isset($_POST["type"])?$_POST["type"]:null;
switch($type) {
	case "C":echo ClienteCRUD::Create(new Cliente($_POST["nombre"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$POST["fecha_nacimiento"]));break;
	case "R":echo ClienteCRUD::Read(new Cliente($_POST["id"]));break;
	case "U":echo ClienteCRUD::Update(new Cliente($_POST["id"],$_POST["nombre"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$POST["fecha_nacimiento"]));break;
	case "D":echo ClienteCRUD::Delete(new Cliente($_POST["id"]));break;
	case null:echo ClienteCRUD::All();break;
}

class Cliente {
	var $clienteDAO;
	function __construct() {
		$params = func_get_args();
		$num_params = func_num_args();
		$constructor ='__construct'.$num_params;
		if (method_exists($this,$constructor)) {
			call_user_func_array(array($this,$constructor),$params);
		}
	}

	function __construct1($id) {
		$this->clienteDAO = ClienteDaoObject::findId($id);
	}
	function __construct5($nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {
		$this->clienteDAO = new ClienteDaoObject();
		$this->clienteDAO->setNombres($nombre);
		$this->clienteDAO->setCiudad($ciudad);
		$this->clienteDAO->setSexo($sexo);
		$this->clienteDAO->setTelefono($telefono);
		$this->clienteDAO->setFechaNacimiento($fecha_nacimiento);
	}
	function __construct6($id,$nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {
		$this->clienteDAO = ClienteDaoObject::findId($id);
		$this->clienteDAO->setNombres($nombre);
		$this->clienteDAO->setCiudad($ciudad);
		$this->clienteDAO->setSexo($sexo);
		$this->clienteDAO->setTelefono($telefono);
		$this->clienteDAO->setFechaNacimiento($fecha_nacimiento);
	}
	
	function toJSON() {
		$json_array = $this->clienteDAO->toJSON();
		return json_encode($json_array,JSON_FORCE_OBJECT);
	}
	
}

class ClienteCRUD{

public function Create($cliente) {
	$cliente->clienteDAO->save();
	return $cliente->toJSON();
}

public function Read($cliente) {
	return $cliente->toJSON();
}

public function Update($cliente) {
	$cliente->clienteDAO->save();
	return $cliente->toJSON();
}

public function Delete($cliente) {
	$cliente->delete();
}
public function All() {
	$clienteFacotry = new ClienteDaoFactory();
	$coll = $clienteFacotry->getCollection();
	return json_encode($coll->toJson(),JSON_FORCE_OBJECT);
}

}



 ?>