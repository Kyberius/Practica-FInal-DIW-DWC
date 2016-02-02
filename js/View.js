
//Esto ya funcionaba con handlebars desde consola:
//$('#tabla').html(Handlebars.compile($("#table-template").html())({clientesArray:[{"id":1,"nombres":"ANA BELDA ALBERO","ciudad":"FONTANARS DELS ALFORINS","sexo":"M","telefono":"619087609","fechaNacimiento":"2016-02-10 00:00:00"}]}))

//View 


var View = (function () { 
	var HBtableSource;
	var HBtableTemplate;
	var HBtableData;
	var HBrowSource;
	var HBrowTemplate;

	/**definimos los metodos a ejecutar para actualizar la vista***//// 
	//subscribers 

	function rowInsert(_,clienteJSON) { 
		HBrowSource = !!HBrowSource?$("#row-template").html():HBrowSource;
		HBrowTemplate = Handlebars.compile(HBrowSource); 
		$('#' + clienteJSON.id).html(HBrowTemplate(clienteJSON));
	}	

	function rowUpdate(_,clienteJSON) { 
		HBrowSource = !!HBrowSource?$("#row-template").html():HBrowSource;
		HBrowTemplate = Handlebars.compile(HBrowSource); 
		$('#' + clienteJSON.id).html(HBrowTemplate(clienteJSON));
	}

	function rowRemove(_,id) { 
		$('#' + id).remove();
	}

	return { 
		init: function () { 
			HBtableSource = $("#table-template").html(); 
			HBtableTemplate = Handlebars.compile(HBtableSource); 
			HBtableData = {clientesArray: ClientesCollection.getAll()}

			$('#tabla').html(HBtableTemplate(HBtableData));
			
			//events.subscribe('paceKm', calculatePace); 
		},
		rowInsert:rowInsert,
		rowUpdate:rowUpdate,
		rowRemove:rowRemove

	} 
}()); 

/*** añadimos eventos de click**

********/ 

View.init();