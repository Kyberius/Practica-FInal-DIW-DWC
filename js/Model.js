
var ClientesCollection = (function() {
	//Private
	var clientes;
	var ReadAll = function() {
		$.post("CRUD.php",function(response) {
			clientes = $.makeArray(response);
		},"JSON");
	}

	//Public
	var GetAll = function() {
		return clientes;
	}

	var GetById = function(id) {

	}

	var delete = function(arrayId) {
		delete clientes[arrayId];
	}

	var sortById = function() {
		clientes.sort(funtion(a,b) {
			return a.getId() - b.getId();
		})
	}

	var sortByName = function() {
		clientes.sort(function(a,b) {
			return a.getNombre()<b.getNombre()?-1:a.getNombre()>b.getNombre()?1:0;
		})
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
	var fill = function (id,nombre,ciudad,sexo,telefono,fechaNacimiento) {
		id = id;
		nombre = nombre;
		ciudad = ciudad;
		sexo = sexo;
		telefono = telefono;
		fechaNacimiento = fechaNacimiento;
	}

	var empty = function () {
		id = null;
		nombre = null;
	}
	//Public
	
	//Reveal
	return {

	}
});