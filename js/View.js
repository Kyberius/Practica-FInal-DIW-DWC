
//Esto ya funcionaba con handlebars desde consola:
//$('#tabla').html(Handlebars.compile($("#table-template").html())({clientesArray:[{"id":1,"nombres":"ANA BELDA ALBERO","ciudad":"FONTANARS DELS ALFORINS","sexo":"M","telefono":"619087609","fechaNacimiento":"2016-02-10 00:00:00"}]}))

//View 


var View = (function () { 
	//HandleBars variables
	var HBtableSource;
	var HBtableTemplate;
	var HBtableData;
	var HBrowSource;
	var HBrowTemplate;
	
	function tableCreator(clientsArray) {
		HBtableSource = (typeof HBtableSource === "undefined")?$("#table-template").html():HBtableSource; 
		HBtableTemplate = (typeof HBtableTemplate === "undefined")?Handlebars.compile(HBtableSource):HBtableTemplate; 
		HBtableData = {clientsArray: clientsArray}
		if (typeof HBrowSource === "undefined") {
			HBrowSource = $("#row-template").html();
			Handlebars.registerPartial("rowtemplate", HBrowSource);
		}
		return HBtableTemplate(HBtableData);
	}

	function rowCreator(cJson) {
		HBrowTemplate = (typeof HBrowTemplate === "undefined")?Handlebars.compile(HBrowSource):HBrowTemplate; 
		return HBrowTemplate(cJson);
	}

	function showForm() {
		$("#tabla").hide('slow/400/fast', function() {
			$("#formulario").show('slow/400/fast');
		});
	}

	function showTable() {
		$("#formulario").hide('slow/400/fast', function() {
			$("#tabla").show('slow/400/fast');
		});
	}

	//subscribers
	function rowInsert(_,clienteJSON) { 
		$('#tabla>table>tbody:last-child').append(rowCreator(clienteJSON));
	}	

	function rowUpdate(_,clienteJSON) { 
		$('#' + clienteJSON.id).replaceWith(rowCreator(clienteJSON));
	}

	function rowRemove(_,id) { 
		$('#' + id).remove();
	}



	return { 

		rowInsert:rowInsert,
		rowUpdate:rowUpdate,
		rowRemove:rowRemove,
		showForm:showForm,
		showTable:showTable,

		init: function () { 
			//hide form and fill table
			$('#tabla').html(tableCreator(ClientesCollection.getAll()));

			//subscribe to Model publish events
			$.subscribe("insertado",rowInsert);
			$.subscribe("actualizado",rowUpdate);
			$.subscribe("borrado",rowRemove);
		},
		


		//provisional para pruebas
		HBtableSource:HBtableSource,
		HBtableTemplate:HBtableTemplate,
		HBtableData:HBtableData,
		HBrowSource:HBrowSource,
		HBrowTemplate:HBrowTemplate
	} 
}()); 




/*** add event listeners***/ 
$("#new").click(function(event) {
	View.showForm();
	
	//.....
});

$(".tdDelete").click(function(event) {
	View.showForm();
	//.....
});

$(".tdEdit").click(function(event) {
	View.showForm();
	//.....
});

/*** initialization ***/
$.when(ClientesCollection.init()).done(function(){
	$(window).load(function(){
		View.init();
	});
})	
