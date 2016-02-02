var ClientesCollection = (function() {
	//Private
	var clientes = [];
	var ReadAll = function() {
		$.post("CRUD.php",function(response) {
			clientes = $.map(response,function(el) {return el});
		},"JSON");
		sortByName();
	}
	var findById = function(id) {
		return clientes.find(function(element,index,array) {
			return element.id==id?true:false;
		});
	}
	//Public
	var getAll = function() {
		return clientes;
	}
	var getById = function(id) {
		return findById(id);
	}
	//Subscribers
	var add = function(_,cliente) {
		clientes.push(cliente);
	}
	var update = function(_,cliente) {
		index = $.map(clientes,function(e) {return e.id}).indexOf(cliente.id);
		clientes[index] = cliente;
	}
	var remove = function(_,id) {
		delete clientes[$.map(clientes,function(e) {return e.id}).indexOf(id)];
	}
	//Sorting
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
		$.suscribe("insertado",add);
		$.suscribe("actualizado",update);
		$.suscribe("borrado",remove);
	}
	//init is not defined
	return {
		init:init,
		getAll:getAll,
		getById:getById,
	}
}());
ClienteModel.init();


//Actualizar todas las llamadas a publish suscriber
var ClienteModel = (function() {
	var my = {};
	//Private
	var clienteJSON;

	function load(id) {
		clienteJSON = ClientesCollection.getById(id);
	}
	function empty() {
		clienteJSON = {};
	}
	function insertDB() {
		clienteJSON.type = "C";
		$.post("CRUD.php",clienteJSON,function(cliente) {
			$.publish("insertado",[cliente]);
			//$.publish() //Publicar añadido cliente enviando el objeto para la vista
		},"JSON");
	}
	function updateDB() {
		clienteJSON.type = "U";
		$.post("CRUD.php",clienteJSON,function(cliente) {
			$.publish("actualizado",[cliente]);
			//pubsub
		},"JSON")
	}

	function deleteDB(id) {
		$.post("CRUD.php",{id:id,type:"D"},function() {
			$.publish("borrado",[id]);
		})
	}
	//Public
	my.new = function() {
		empty();
	}
	my.edit = function(id) {
		load(id);
	}
	my.remove =function(id) {
		deleteDB(id);
		empty();
	}
	my.save = function() {
		!!clienteJSON.id?updateDB():insertDB();
		empty();
	}

	my.reload = function() {
		!!clienteJSON.id?load(clienteJSON.id):empty();
		//recordarle a dani que haga el relaod en el formulario reset
	}
	//Getter & Setters
	my.getId = function() {return clienteJSON.id}
	my.getNombre= function() {return clienteJSON.nombres}
	my.setNombre = function(value) {clienteJSON.nombres = value}
	my.getCiudad = function() {return clienteJSON.ciudad}
	my.setCiudad = function(value) {clienteJSON.ciudad = value}
	my.getSexo = function() {return clienteJSON.sexo}
	my.setSexo = function(value) {clienteJSON.sexo = value}
	my.getTelefono = function() {return clienteJSON.telefono}
	my.setTelefono = function(value) {clienteJSON.telefono = value}
	my.getFechaNacimiento = function() {return clienteJSON.fechaNacimiento}
	my.setFechaNacimiento = function(value) {clienteJSON.fechaNacimiento = value}
	//Reveal
	return my;
}());