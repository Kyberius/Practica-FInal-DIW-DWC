
//Esto ya funcionaba con handlebars desde consola:
//$('#tabla').html(Handlebars.compile($("#table-template").html())({clientesArray:[{"id":1,"nombres":"ANA BELDA ALBERO","ciudad":"FONTANARS DELS ALFORINS","sexo":"M","telefono":"619087609","fechaNacimiento":"2016-02-10 00:00:00"}]}))

//View 


var View = (function () { 
	//Page objects variables
	var divTable;
	var tBody;
	var divForm;
	var form;

	//HandleBars variables
	var HBtableSource;
	var HBtableTemplate;
	var HBtableData;
	var HBrowSource;
	var HBrowTemplate;
	
	//HandleBars templates methods
	function tableCreator(clientsArray) {
		HBtableSource = (typeof HBtableSource === "undefined")?$("#table-template").html():HBtableSource; 
		HBtableTemplate = (typeof HBtableTemplate === "undefined")?Handlebars.compile(HBtableSource):HBtableTemplate; 
		HBtableData = {clientsArray: clientsArray};
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

	function fillForm(){
		form = (typeof form === "undefined")?divForm.find(">:first-child"):form;
		form[0].reset();
		if (typeof form.inputNombre === "undefined") {
			form.inputNombre = form.find("input[name=nombre]");
			form.inputCiudad = form.find("input[name=ciudad]");
			var radios = form.find("input[type=radio]");
			form.radioSexoM = radios.eq(0);
			form.radioSexoF = radios.eq(1);
			form.inputTelefono = form.find("input[name=telefono]");
			form.inputFechaNacimiento = form.find("input[name=FechaNacimiento]");
		}

		form.inputNombre.val(ClienteModel.getNombre());
		form.inputCiudad.val(ClienteModel.getCiudad());
		var sexo = ClienteModel.getSexo();
		//if (sexo == "M")
		//	form.radioSexoM.Click();
		//else if (sexo == "M")
		//	form.radioSexoF.Click();

		form.inputTelefono.val(ClienteModel.getTelefono());
		form.inputFechaNacimiento.val(ClienteModel.getFechaNacimiento());
	}

	//Show/hide methods
	function showForm() {
		divTable.hide('slow/200/fast', function() {
			divForm.show('slow/200/fast');
		});
	}

	function showTable() {
		divForm.hide('slow/200/fast', function() {
			divTable.show('slow/200/fast');
		});
	}

	//Click adders
	function addTableEventListeners() {
		divTable.find(">#new").click(newClick);
		tBody.find("tr .tdDelete").click(deleteClick);
		tBody.find("tr .tdEdit").click(editClick);
	}

	function addRowEventListeners(id) {
		tBody.find("tr#" + id + " .tdDelete").click(deleteClick);
		tBody.find("tr#" + id + " .tdEdit").click(editClick);
	}	

	//Click functions
	function newClick(event) {
		ClienteModel.new();
		View.fillForm();
		View.showForm();
	};

	function deleteClick(event) {
		if (confirm("Eliminar Cliente?"))
			ClientesCollection.remove($(this).parent().attr("id"));
	};

	function editClick(event) {
		ClienteModel.edit($(this).parent().attr("id"));
		View.fillForm();
		View.showForm();
	}

	//subscribers
	function rowInsert(_,clienteJSON) { 
		tBody.append(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
	}	

	function rowUpdate(_,clienteJSON) { 
		tBody.find('#' + clienteJSON.id).replaceWith(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
	}

	function rowRemove(_,id) { 
		tBody.find('#' + id).remove();
	}



	return { 

		rowInsert:rowInsert,
		rowUpdate:rowUpdate,
		rowRemove:rowRemove,
		fillForm:fillForm,
		showForm:showForm,
		showTable:showTable,

		init: function () { 
			//set divs pointers
			divTable = $("div#tabla");
			divForm = $("div#formulario");
			//fill table and set tBody pointer
			divTable.html(tableCreator(ClientesCollection.getAll()));
			tBody =	divTable.find("table>tbody");

			//subscribe to Model publish events
			$.subscribe("insertado",rowInsert);
			$.subscribe("actualizado",rowUpdate);
			$.subscribe("borrado",rowRemove);

			// add event listeners
			addTableEventListeners();
		},
		


		//provisional para pruebas
		HBtableSource:HBtableSource,
		HBtableTemplate:HBtableTemplate,
		HBtableData:HBtableData,
		HBrowSource:HBrowSource,
		HBrowTemplate:HBrowTemplate
	} 
}()); 

/*** initialization ***/
$.when(ClientesCollection.init()).done(function(){
	$(window).load(function(){
		View.init();
	});
})	
