//3.-habria que volver al ReadAll async con un pub-sub que dispare View.init

var ClientesCollection = (function() {
	//Private
	var clientes = [];
	var ReadAll = function() {
		function success(response) {
			clientes = $.map(response,function(el) {return el});
			$.publish("modeloCargado",[]);
		}
		$.ajax({
		  type: "POST",
		  url: "CRUD.php",
		  success: success,
		  dataType: "json",
		  async:true
		});
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
	var getSize = function() {
		return clientes.size();
	}
	var getById = function(id) {
		return findById(id);
	}
	var getPage = function(size,page) {
		var inicio =size*(page-1);
		var fin = inicio + size;
		return clientes.slice(inicio,fin);
	}
	//Subscribers
	var add = function(_,cliente) {
		clientes.push(cliente);
	}

	var remove = function(_,id) {
		index = $.map(clientes,function(e) {return e.id}).indexOf(id*1)
		clientes.splice(index,1);
	}
	//Sorting
	var sortById = function() {
		clientes.sort(function(a,b) {
			return a.id - b.id;
		})
	}
	var sortByName = function() {
		clientes.sort(function(a,b) {
			return a.nombres<b.nombres?-1:a.nombres>b.nombres?1:0;
		})
	}
	//Reveal 
	var init = function() {
		ReadAll();
		$.subscribe("insertado",add);
		$.subscribe("borrado",remove);
	}
	
	return {
		init:init,
		getAll:getAll,
		getById:getById,
		getPage:getPage,
		getSize:getSize
	}
}());


//Actualizar todas las llamadas a publish suscriber
var ClienteModel = (function() {
	var my = {};
	//Private
	var clienteJSON;
	var ImgInputFild;
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
			uploadImg(cliente.id);
		},"JSON");
	}
	function updateDB() {
		clienteJSON.type = "U";
		$.post("CRUD.php",clienteJSON,function(cliente) {
			$.publish("actualizado",[cliente]);
			uploadImg(cliente.id);
		},"JSON")
	}

	function deleteDB(id) {
		$.post("CRUD.php",{id:id,type:"D"},function() {
			$.publish("borrado",[id]);
		})
	}
	function uploadImg(id) {
		ImgInputFild.upload("images.php",{id:id});
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
		//uploadImg();
		empty();
	}

	my.reload = function() {
		!!clienteJSON.id?load(clienteJSON.id):empty();
	}

	my.setImageReference = function(Reference) {
		ImgInputFild = Reference;
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

/*** initialization ***/
ClientesCollection.init();