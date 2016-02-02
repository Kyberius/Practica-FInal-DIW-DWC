var ClientesCollection = (function() {
	//Private
	var clientes = [];
	var ReadAll = function() {
		$.post("CRUD.php",function(response) {
			clientes = $.map(response,function(el) {return el});
		},"JSON");
	}
	var findById = function(id) {
		return clientes.find(function(element,index,array) {
			return element.id==id?true:false;
		});
	}

	var findClientId = function(cliente) {
		return clientes.indexOf()
	}
	//Public
	var getAll = function() {
		return clientes;
	}
	var getById = function(id) {
		return findById(id);
	}
	var delete = function(id) {
		var find = findById(id).type = "D";
		$.post("CRUD.php",{find},function(response) {
			delete //todo
		}
	}

	var sortById = function() {
		clientes.sort(function(a,b) {
			return a.getId() - b.getId();
		})
	}

	var sortByName = function() {
		clientes.sort(function(a,b) {
			return a.getNombre()<b.getNombre()?-1:a.getNombre()>b.getNombre()?1:0;
		})
	}


	//Reveal 
	var init = function() {
		ReadAll();
	}

	//init is not defined
	return my = {
		init:init,
		getAll:getAll()
	}
}());
ClienteModel.init();



var ClienteModel = (function() {
	//Private
	var id,nombre,ciudad,sexo,telefono,fechaNacimiento;
	//TODOS los metodos de gestion del modulo.
	var load = function (id) {
		cliente = ClientesCollection.getById(id);

	}

	var empty = function () {
		
	}
	//Public
	
	//Reveal
	return my;
});