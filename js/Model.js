
var ClientesCollection = (function() {
	//Private
	var clientes;
	var ReadAll = function() {
		$.post("CRUD.php",function(response) {
			clientes = response;
		},"JSON");
	}
	var ReadOne = function() {
		$.post("CRUD.php",function(response) {

		},"JSON");
	}

	//Public
	var GetAll = function() {
		return clientes;
	}

	var GetById = function(id) {

	}
	


	//Reveal
	var my = {
		init:init,

	}
}());



var Cliente = (function() {
	//Private
	var id,nombre,ciudad,sexo,telefono,fechaNacimiento;
	//TODOS los metodos de gestion del modulo. 
	//Public
	
	//Reveal
	my = {
	}
});