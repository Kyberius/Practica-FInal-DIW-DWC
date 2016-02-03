
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
		//esta asignacion no funciona y HBrowSource se queda undefined
		HBrowSource = !!HBrowSource?$("#row-template").html():HBrowSource;
		HBrowTemplate = Handlebars.compile(HBrowSource); 
		$('#' + clienteJSON.id).replaceWith(HBrowTemplate(clienteJSON));
	}	

	function rowUpdate(_,clienteJSON) { 
		//esta asignacion no funciona y HBrowSource se queda undefined
		HBrowSource = !!HBrowSource?$("#row-template").html():HBrowSource;
		HBrowTemplate = Handlebars.compile(HBrowSource); 
		$('#' + clienteJSON.id).replaceWith(HBrowTemplate(clienteJSON));
	}

	function rowRemove(_,id) { 
		$('#' + id).remove();
	}

	return { 
		init: function () { 
			HBtableSource = $("#table-template").html(); 
			HBtableTemplate = Handlebars.compile(HBtableSource); 
			HBtableData = {clientesArray: ClientesCollection.getAll()}
			Handlebars.registerPartial("rowtemplate", $("#row-template").html());
			$('#tabla').html(HBtableTemplate(HBtableData));
			
			//events.subscribe('paceKm', calculatePace); 
		},
		rowInsert:rowInsert,
		rowUpdate:rowUpdate,
		rowRemove:rowRemove,


		//provisional para pruebas
		HBtableSource:HBtableSource,
		HBtableTemplate:HBtableTemplate,
		HBtableData:HBtableData
	} 
}()); 

/*** añadimos eventos de click**

********/ 

/*$(document).ready(function() {
    View.init();
});*/

$(window).load(function(){
  View.init();
});