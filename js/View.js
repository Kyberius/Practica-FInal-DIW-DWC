var View = (function () { 
	//Jquery center functtion
	$.fn.center = function() {
		this.css("position","absolute").css("z-index","5000")
		.css("top","50%").css("left","50%")
		.css("margin",(-(this.height()/2))+"px 0 0 "+(-(this.width()/2))+"px"); 
		return this;
	};

	//Page ojects variables
	var divTable;
	var divForm;
	var alert;


	//HandleBars variables
	var HBtableSource;
	var HBtableTemplate;
	var HBtableData;
	var HBrowSource;
	var HBrowTemplate;

	
	//HandleBars templates functions
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


	//set elements pointers functions
	function setParentsPointers() {
		divTable = $("div#tabla");
		divForm = $("div#formulario");
		alert = {};
	}

	function setChildrenPointers() {
		//divTable children
		divTable.tBody = divTable.find("table>tbody");

		//alerts pointers
		alert.added = $("div#added-alert");
		alert.edited = $("div#edited-alert");
		alert.deleted = $("div#deleted-alert");

		//divForm children
		divForm.inputNombre = divForm.find("input[name=nombres]");
		divForm.inputCiudad = divForm.find("input[name=ciudad]");
		var radios = divForm.find("input[type=radio]");
		divForm.radioSexoM = radios.eq(0);
		divForm.radioSexoF = radios.eq(1);
		divForm.inputTelefono = divForm.find("input[name=telefono]");
		divForm.inputFechaNacimiento = divForm.find("input[name=fechaNacimiento]");
		divForm.inputImage = divForm.find("input[name=imagen]");
		ClienteModel.setImageReference(divForm.inputImage);
		divForm.buttonReset = divForm.find("button[name=reset]"); 
		divForm.buttonSubmit = divForm.find("button[name=submit]"); 
		divForm.buttonBack = divForm.find("button[name=back]");
	}


	//form functions
	function fillForm(){
		var value = ClienteModel.getNombre() || "";
		divForm.inputNombre.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputNombre);		
		value = ClienteModel.getCiudad() || "";
		divForm.inputCiudad.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputCiudad);
		var sexo = ClienteModel.getSexo() || "";
		if (sexo == "M") {
			divForm.radioSexoM.attr('checked', 'checked');
			divForm.radioSexoF.prop('checked', false);
		}
		else if (sexo == "F") {
			divForm.radioSexoF.attr('checked', 'checked');
			divForm.radioSexoM.prop('checked', false);
		} else {
			divForm.radioSexoM.removeAttr('checked').removeProp('checked');
			divForm.radioSexoF.removeAttr('checked').removeProp('checked');
		}
		value = ClienteModel.getTelefono() || "";
		divForm.inputTelefono.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputTelefono);
		value = ClienteModel.getFechaNacimiento() || "";
		divForm.inputFechaNacimiento.val(value).prop('defaultValue',value);
		emptyFormValidate(divForm.inputFechaNacimiento);
		divForm.inputImage.val("");
		divForm.buttonSubmit.prop('disabled',false);
	function emptyFormValidate(elem) {
		elem.parent().parent().removeClass('has-error has-success')
	}

	}



	function submitForm(event) {
		if (confirm("Guardar Cambios?")) {
			//... validar los campos
			ClienteModel.save();
		}
	}

	function resetForm(event) {
		if (confirm("Borrar Cambios?")) {
			ClienteModel.reload();
			divForm.inputNombre.val(function() { return $(this).prop('defaultValue')});
			divForm.inputCiudad.val(function() { return $(this).prop('defaultValue')});
			if (divForm.radioSexoM.attr('checked') == "checked")
				divForm.radioSexoM.prop("checked",true);
			else if (divForm.radioSexoF.attr('checked') == "checked")
				divForm.radioSexoF.prop("checked",true);
			divForm.inputTelefono.val(function() { return $(this).prop('defaultValue')});
			divForm.inputFechaNacimiento.val(function() { return $(this).prop('defaultValue')});
		}
	}


	//Show/hide functions
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


	//Add event listeners functions
	function addTableEventListeners() {
		divTable.find(">#new").click(newClick);
		divTable.tBody.find("tr .tdDelete").click(deleteClick);
		divTable.tBody.find("tr .tdEdit").click(editClick);
	}

	function addRowEventListeners(id) {
		divTable.tBody.find("tr#" + id + " .tdDelete").click(deleteClick);
		divTable.tBody.find("tr#" + id + " .tdEdit").click(editClick);
	}

	function addFormEventListeners() {
		divForm.inputNombre.keyup(function(event) {
			validate($(this),/[a-zñ]\s*/gi);
			ClienteModel.setNombre($(this).val());
		});
		divForm.inputCiudad.keyup(function(event) {
			validate($(this),/[a-zñ]\s*/gi);
			ClienteModel.setCiudad($(this).val());
		});
		divForm.radioSexoM.change(function() {
			if ($(this).prop("checked")) 
				ClienteModel.setSexo("M");
		});
		divForm.radioSexoF.change(function() {
			if ($(this).prop("checked")) 
				ClienteModel.setSexo("F");
		});
		divForm.inputTelefono.keyup(function(event) {
			validate($(this),/[+]?\d\s?/g);
			ClienteModel.setTelefono($(this).val());
		});
		divForm.inputFechaNacimiento.change(function(event) {
			validate($(this),/\d{4}\-\d{2}-\d{2}/);
			ClienteModel.setFechaNacimiento($(this).val());
		});
		divForm.inputFechaNacimiento.datepicker({
			changeMonth: true,
      		changeYear: true,
      		dateFormat:"yy-mm-dd",
      		yearRange: "1900:c",
      		firstDay: 1,
      		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
      		monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec" ]
		});
		divForm.buttonSubmit.click(submitForm);
		divForm.buttonReset.click(resetForm);
		divForm.buttonBack.click(showTable)
	}

	function validate(element,pattern) {
		pattern.test(element.val())?successCotent():errorContent();
		function errorContent() {
			element.parent().parent().removeClass('has-success');
			element.parent().parent().addClass('has-error');
			divForm.buttonSubmit.prop('disabled',true);
		}
		function successCotent() {
			element.parent().parent().removeClass('has-error');
			element.parent().parent().addClass('has-success');
			divForm.buttonSubmit.prop('disabled',false);
		}
	}

	


	//table clicks handle functions
	function newClick(event) {
		ClienteModel.new();
		fillForm();
		showForm();
	};

	function deleteClick(event) {
		if (confirm("Eliminar Cliente?"))
			ClienteModel.remove($(this).parent().attr("id"));
	};

	function editClick(event) {
		ClienteModel.edit($(this).parent().attr("id"));
		fillForm();
		showForm();
	}

	//subscribers for model publishers
	function rowInsert(_,clienteJSON) { 
		divTable.tBody.append(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
		divForm.hide();
		divTable.show();
		//showTable();
		showAlert(alert.added);
	}	

	function rowUpdate(_,clienteJSON) { 
		divTable.tBody.find('#' + clienteJSON.id).replaceWith(rowCreator(clienteJSON));
		addRowEventListeners(clienteJSON.id);
		showTable();
		showAlert(alert.edited);
	}

	function rowRemove(_,id) { 
		divTable.tBody.find('#' + id).remove();
		showTable();
		showAlert(alert.deleted);
	}

	//alert model changes
	function showAlert(alert) {
		$.when(alert.show().addClass("in").fadeIn(600).center().delay(1500).fadeOut(300)).done(function(){$(this).removeClass("in").hide()});
		//alert.delay(2000).addClass("in").fadeOut(3500);
		/*alert.alert();
		alert.fadeTo(2000, 500).slideUp(500, function(){
			alert.alert('close');
		});*/   
	}


	//Public
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
		}
	} 
}()); 

/*** initialization ***/
$.when(ClientesCollection.init()).done(function(){
	$(window).load(function(){
		View.init();
	});
})	
