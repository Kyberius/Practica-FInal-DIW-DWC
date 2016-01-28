<?php
namespace dao\empresaDatabase;
include("clases/dao/empresaDatabase/autoload.php");
include("Parm/vendor/autoload.php");
use \Parm\Config;
Config::setupConnection("empresa","empresa","root","","localhost");
$type = isset($_POST["type"])?$_POST["type"]:null;
swtich($type) {
	case "C":echo ClienteCRUD::Create(new Cliente($_POST["nombre"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$POST["fecha_nacimiento"]));break;
	case "R":echo ClienteCRUD::Read(new Cliente($_POST["id"]));break;
	case "U":echo ClienteCRUD::Update(new Cliente($_POST["id"],$_POST["nombre"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$POST["fecha_nacimiento"]));break;
	case "D":echo ClienteCRUD::Delete(new Cliente());
	case null:
}

class Cliente {
	var $clienteDAO;
	function __construct($id) {
		$this->clienteDAO = ClienteDaoObject::findId($id);
	}
	function __construct($nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {
		$this->clienteDAO = new ClienteDaoObject();
		$this->clienteDAO->setNombres($nombre);
		$this->clienteDAO->setCiudad($ciudad);
		$this->clienteDAO->setSexo($sexo);
		$this->clienteDAO->setTelefono($telefono);
		$this->clienteDAO->setFechaNacimiento($fecha_nacimiento);
	}
	constant($id,$nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {
		$this->clienteDAO = ClienteDaoObject::findId($id);
		$this->clienteDAO->setNombres($nombre);
		$this->clienteDAO->setCiudad($ciudad);
		$this->clienteDAO->setSexo($sexo);
		$this->clienteDAO->setTelefono($telefono);
		$this->clienteDAO->setFechaNacimiento($fecha_nacimiento);
	}
	function toJSON() {
		$json_array = ["id"=>$clienteDAO->getId(),
		"nombres"=>$clienteDAO->getNombres(),
		"ciudad"=>$clienteDAO->getCiudad(),
		"sexo"=>$clienteDAO->getSexo();
		"telefono"=>$clienteDAO->getTelefono(),
		"fecha_nacimiento"=>$clienteDAO->getFechaNacimiento()];
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
	$cliente->clienteDAO->delete();
}

//todo

}



 ?>