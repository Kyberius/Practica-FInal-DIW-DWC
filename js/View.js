var View = (function () { 
	//Page objects variables
	var divTable;
	var divForm;

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


	//set elements pointers methods
	function setParentsPointers() {
		divTable = $("div#tabla");
		divForm = $("div#formulario");
	}

	function setChildrenPointers() {
		//divTable children
		divTable.tBody = divTable.find("table>tbody");

		//divForm children
		divForm.inputNombre = divForm.find("input[name=nombres]");
		divForm.inputCiudad = divForm.find("input[name=ciudad]");
		var radios = divForm.find("input[type=radio]");
		divForm.radioSexoM = radios.eq(0);
		divForm.radioSexoF = radios.eq(1);
		divForm.inputTelefono = divForm.find("input[name=telefono]");
		divForm.inputFechaNacimiento = divForm.find("input[name=fechaNacimiento]");
		divForm.buttonReset = divForm.find("button[name=borrar]"); 
		divForm.buttonSubmit = divForm.find("button[name=enviar]"); 
		
	}

	//fill form with ClienteModel data method
	function fillForm(){
		var value = ClienteModel.getNombre();
		divForm.inputNombre.val(value).prop('defaultValue',value);
		value = ClienteModel.getCiudad();
		divForm.inputCiudad.val(value).prop('defaultValue',value);
		var sexo = ClienteModel.getSexo();
		if (sexo == "M") {
			divForm.radioSexoM.attr('checked', 'checked');
			divForm.radioSexoF.prop('checked', false);
		}
		else if (sexo == "F") {
			divForm.radioSexoF.attr('checked', 'checked');
			divForm.radioSexoM.prop('checked', false);
		}
		value = ClienteModel.getTelefono();
		divForm.inputTelefono.val(value).prop('defaultValue',value);
		value = ClienteModel.getFechaNacimiento();
		divForm.inputFechaNacimiento.val(value).prop('defaultValue',value);
	}

	function submitForm() {
		if (confirm("Guardar Cambios?")) {
			//... validar los campos
			ClienteModel.save();
			View.showTable();
		}
	}

	function resetForm() {
		if (confirm("Borrar Cambios?")) {
			ClienteModel.reload();
			divForm.inputNombre.val(function() { return $(this).prop('defaultValue')});
			divForm.inputCiudad.val(function() { return $(this).prop('defaultValue')});
			if (divForm.radioSexoM.attr('checked') == "checked")
				divForm.radioSexoM.prop("checked",true);
			else
				divForm.radioSexoF.prop("checked",true);
			divForm.inputTelefono.val(function() { return $(this).prop('defaultValue')});
			divForm.inputFechaNacimiento.val(function() { return $(this).prop('defaultValue')});
		}
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

	//Event listeners adders
	function addTableEventListeners() {
		divTable.find(">#new").click(newClick);
		divTable.tBody.find("tr .tdDelete").click(deleteClick);
		divTable.tBody.find("tr .tdEdit").click(editClick);
	}

	function addRowEventListeners(id) {
		divForm.tBody.find("tr#" + id + " .tdDelete").click(deleteClick);
		divForm.tBody.find("tr#" + id + " .tdEdit").click(editClick);
	}

	function addFormEventListeners() {
		divForm.buttonSubmit.click(submitForm);
		divForm.buttonReset.click(resetForm);
	}	

	//table clicks handle functions
	function newClick(event) {
		ClienteModel.new();
		View.fillForm();
		View.showForm();
	};

	function deleteClick(event) {
		if (confirm("Eliminar Cliente?"))
			ClienteModel.remove($(this).parent().attr("id"));
	};

	function editClick(event) {
		ClienteModel.edit($(this).parent().attr("id"));
		View.fillForm();
		View.showForm();
	}

	//subscribers for model publishers
	function rowInsert(_,clienteJSON) { 
		divForm.tBody.append(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
	}	

	function rowUpdate(_,clienteJSON) { 
		divForm.tBody.find('#' + clienteJSON.id).replaceWith(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
	}

	function rowRemove(_,id) { 
		divForm.tBody.find('#' + id).remove();
	}



	return { 

		init: function () { 
			setParentsPointers();

			//create and append clients table
			divTable.html(tableCreator(ClientesCollection.getAll()));
			
			setChildrenPointers();

			//subscribe to Model publish events
			$.subscribe("insertado",rowInsert);
			$.subscribe("actualizado",rowUpdate);
			$.subscribe("borrado",rowRemove);

			// add event listeners
			addTableEventListeners();
			addFormEventListeners();
		},

		rowInsert:rowInsert,
		rowUpdate:rowUpdate,
		rowRemove:rowRemove,
		fillForm:fillForm,
		showForm:showForm,
		showTable:showTable,
		divTable:divTable,
		divForm:divForm,

		


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
