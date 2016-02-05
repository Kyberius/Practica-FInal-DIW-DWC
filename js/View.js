var View = (function () { 
	//Page objects variables
	var divTable;
	var tBody;
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

	function fillForm(){
		if (typeof divForm.inputNombre === "undefined") {
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
		var value = ClienteModel.getNombre();
		divForm.inputNombre.val(value).prop('defaultValue',value);
		value = ClienteModel.getCiudad();
		divForm.inputCiudad.val(value).prop('defaultValue',value);
		var sexo = ClienteModel.getSexo();
		if (sexo == "M") {
			divForm.radioSexoM.attr('checked', 'checked');
			divForm.radioSexoF.attr('checked', false);
		}
		else if (sexo == "F") {
			divForm.radioSexoF.attr('checked', 'checked');
			divForm.radioSexoM.attr('checked', false);
		}
		value = ClienteModel.getTelefono();
		divForm.inputTelefono.val(value).prop('defaultValue',value);
		value = ClienteModel.getFechaNacimiento();
		divForm.inputFechaNacimiento.val(value).prop('defaultValue',value);
	}

	function submitForm() {
		//... validar los campos
		ClienteModel.save();
		View.showTable();
	}

	function resetForm() {
		ClientesCollection.reload();
		divForm.inputNombre.val($(this).prop('defaultValue'));
		divForm.inputCiudad.val($(this).prop('defaultValue'));
		if (divForm.radioSexoM.attr('checked') == "checked")
			divForm.radioSexoM.prop("checked",true)
		else
			divForm.radioSexoF.prop("checked",true)
		divForm.inputTelefono.val($(this).prop('defaultValue'));
		divForm.inputFechaNacimiento.val($(this).prop('defaultValue'));
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
		tBody.find("tr .tdDelete").click(deleteClick);
		tBody.find("tr .tdEdit").click(editClick);
	}

	function addRowEventListeners(id) {
		tBody.find("tr#" + id + " .tdDelete").click(deleteClick);
		tBody.find("tr#" + id + " .tdEdit").click(editClick);
	}

	function addFormEventListeners() {
		//preventDefault and stopPropagation
		form.buttonSubmit.click(submitForm);
		form.buttonReset.click(resetForm);
	}	

	//Click functions
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
