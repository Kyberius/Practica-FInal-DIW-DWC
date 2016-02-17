<?php

header("Access-Control-Allow-Origin: *");

require_once('include_dao.php');
$type = isset($_POST["type"])?$_POST["type"]:null;
	
	switch($type) {
		case "C":echo ClienteCRUD::Create(new ClienteCreator($_POST["nombres"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$_POST["fechaNacimiento"]));break;
		case "R":echo ClienteCRUD::Read(new ClienteCreator($_POST["id"]));break;
		case "U":echo ClienteCRUD::Update(new ClienteCreator($_POST["id"],$_POST["nombres"],$_POST["ciudad"],$_POST["sexo"],$_POST["telefono"],$_POST["fechaNacimiento"]));break;
		case "D":echo ClienteCRUD::Delete(new ClienteCreator($_POST["id"]));break;
		case null:echo ClienteCRUD::All();break;
	}

class ClienteCreator {



	var $clienteDAO;
	var $Tbl;
	var $t;
	function __construct() {
		$params = func_get_args();
		$num_params = func_num_args();
		$constructor ='__construct'.$num_params;
		if (method_exists($this,$constructor)) {
			call_user_func_array(array($this,$constructor),$params);
		}
	}

	function __construct1($id) {//delete
		$this->t = new Transaction();
		$this->Tbl=DAOFactory::getClienteDAO();
		$this->clienteDAO = new ClienteCreator();
		$this->clienteDAO->id = $id;
		//$this->clienteDAO = ClienteDaoObject::findId($id);
	}
	function __construct5($nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {//create
		$this->t = new Transaction();
		$this->Tbl=DAOFactory::getClienteDAO();
		$this->clienteDAO = new ClienteCreator();
		$this->clienteDAO->nombres = $nombre;
		$this->clienteDAO->ciudad= $ciudad;
		$this->clienteDAO->sexo = $sexo;
		$this->clienteDAO->telefono=$telefono;
		$this->clienteDAO->fechaNacimiento=$fecha_nacimiento;
	}
	function __construct6($id,$nombre,$ciudad,$sexo,$telefono,$fecha_nacimiento) {//update
		$this->t = new Transaction();
		$this->Tbl=DAOFactory::getClienteDAO();
		$this->clienteDAO = $this->Tbl->load($id);
		$this->clienteDAO->nombres = $nombre;
		$this->clienteDAO->ciudad= $ciudad;
		$this->clienteDAO->sexo = $sexo;
		$this->clienteDAO->telefono=$telefono;
		$this->clienteDAO->fechaNacimiento=$fecha_nacimiento;
	}
	
	function toJSON() {
			$json_array = $this->clienteDAO->toJSON();
			return json_encode($json_array,JSON_FORCE_OBJECT);
	}
	
}

class ClienteCRUD{

	public static function Create($cc) {
		$cc->Tbl->insert($cc->clienteDAO);
		$cc->t->commit();
		return json_encode( (array)$cc->clienteDAO);
	}

	public static function Update($cc) {
		$cc->Tbl->update($cc->clienteDAO);
		$cc->t->commit();
		return json_encode( (array)$cc->clienteDAO);
	}

	public static function Delete($cc) {
		$cc->Tbl->delete($cc->clienteDAO->id);
		$cc->t->commit();
		return 1;
	}
	public static function All() {
		$t = new Transaction();
		$arr=DAOFactory::getClienteDAO()->queryAllOrderBy('nombres');
		$t->commit();
		$Jarr=[];

		for($i=0;$i<count($arr);$i++){
			$c = $arr[$i];
			$Jarr[] = json_encode( (array)$c);
		}
		return json_encode($Jarr,JSON_FORCE_OBJECT);
	}
}
 ?>